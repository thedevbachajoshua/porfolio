import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MessageSquarePlus, X, Send, Quote } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: any;
}

export const Guestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'guestbook'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entryList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuestbookEntry[];
      setEntries(entryList);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'guestbook');
    });

    return () => unsubscribe();
  }, []);

  // Handle auto-scroll and infinite loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container || entries.length === 0) return;

    let animationId: number;
    let lastTime = performance.now();
    const speed = 40; // pixels per second

    const step = (time: number) => {
      if (!isHovered && !isModalOpen) {
        const deltaTime = (time - lastTime) / 1000;
        container.scrollLeft += speed * deltaTime;

        // Loop detection: if we've scrolled past the first set, jump back
        const halfWidth = (container.scrollWidth) / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [entries, isHovered, isModalOpen]);

  const handleManualScroll = () => {
    const container = containerRef.current;
    if (!container || entries.length === 0) return;

    const halfWidth = (container.scrollWidth) / 2;
    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += halfWidth;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName('');
      setMessage('');
      setIsModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'guestbook');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-paper overflow-hidden border-y border-coal/5 relative">
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.8] mb-6">
            Guest<br />book
          </h2>
          <p className="text-sm font-medium text-coal/60 uppercase tracking-widest">
            A small corner for your thoughts, kind words, or just a hello.
          </p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 px-8 py-4 bg-coal text-white font-display font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(241,119,32,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(241,119,32,1)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-none"
        >
          <MessageSquarePlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Add Yours
        </button>
      </div>

      {/* Horizontal Scrolling Loop */}
      <div className="relative w-full py-10">
        <div 
          ref={containerRef}
          onScroll={handleManualScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto scrollbar-none pr-6 cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Double the entries for a seamless loop if there are entries */}
          {(entries.length > 0 ? [...entries, ...entries] : []).map((entry, idx) => (
            <div
              key={`${entry.id}-${idx}`}
              className="flex-shrink-0 w-72 h-72 p-8 bg-white border border-coal/10 brutalist-block shadow-[4px_4px_0px_0px_rgba(0,167,225,0.1)] flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-deep-orange opacity-20" />
              <p className="text-sm font-medium text-coal line-clamp-6 italic leading-relaxed">
                "{entry.message}"
              </p>
              <div className="mt-4 pt-4 border-t border-coal/5">
                <p className="font-display font-black uppercase text-[10px] tracking-widest text-deep-blue">
                  {entry.name}
                </p>
              </div>
            </div>
          ))}
          
          {entries.length === 0 && Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className="flex-shrink-0 w-72 h-72 p-8 bg-white/40 border border-coal/5 brutalist-block flex items-center justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-20">Waiting for first note...</p>
             </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 backdrop-blur-xl bg-transparent"
              />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-paper p-8 border border-coal/20 shadow-[10px_10px_0px_0px_rgba(241,119,32,1)]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-coal/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-8">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">Leave a note</h3>
                <p className="text-xs font-bold text-coal/50 uppercase tracking-widest">
                  Hiiiiii, Feel free to leave a quick note, a kind word, or even a poem... 🤷‍♂️
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Your Name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Whoooooo are yoouuu"
                    className="w-full bg-white border border-coal/10 p-4 focus:outline-none focus:border-deep-orange focus:ring-0 text-sm font-medium transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">The Note</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="The floor is yours"
                    rows={4}
                    className="w-full bg-white border border-coal/10 p-4 focus:outline-none focus:border-deep-orange focus:ring-0 text-sm font-medium transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-coal text-white font-display font-black uppercase text-sm hover:bg-deep-orange transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send className="w-5 h-5" />
                      Sign Guestbook
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
