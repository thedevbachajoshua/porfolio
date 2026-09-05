import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

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
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Paystack Public Key
// When your Paystack account is fully verified, you can replace this with pk_live_... 
// or define VITE_PAYSTACK_PUBLIC_KEY in your deployment environment variables.
const PAYSTACK_PUBLIC_KEY = 
  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_2947262df1df97e3bf93a3907545b9644d780dc2';

interface SupportProps {
  onBackToHome?: () => void;
}

const PRESET_AMOUNTS = [5, 10, 20];

export const Support: React.FC<SupportProps> = ({ onBackToHome }) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    reference: string;
    amount: number;
    donorName?: string;
  } | null>(null);

  // Load Paystack Inline script on mount
  useEffect(() => {
    if ((window as any).PaystackPop) return;
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // Keep script or leave for subsequent visits
    };
  }, []);

  // Compute final amount in GHS
  const finalAmount = selectedPreset !== null 
    ? selectedPreset 
    : (parseFloat(customAmount) || 0);

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
    setErrorMessage(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(val);
    setSelectedPreset(null);
    setErrorMessage(null);
  };

  const handlePay = () => {
    setErrorMessage(null);

    // Validation
    if (!finalAmount || finalAmount < 1) {
      setErrorMessage('Please select or enter an amount of at least 1 GH₵.');
      return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address so Paystack can send your receipt.');
      return;
    }

    const paystackPop = (window as any).PaystackPop;
    if (!paystackPop) {
      setErrorMessage('Paystack is still loading. Please check your internet connection and try again in a few seconds.');
      return;
    }

    setIsLoading(true);

    // Save supporter to Firestore email list
    const recordSupporter = async (paymentRef?: string) => {
      try {
        const payload: Record<string, any> = {
          email: email.trim().toLowerCase(),
          source: 'support_page',
          createdAt: serverTimestamp(),
        };
        if (name.trim()) payload.name = name.trim();
        if (note.trim()) payload.note = note.trim();
        if (finalAmount > 0) payload.amount = Number(finalAmount);
        if (paymentRef) payload.reference = paymentRef;

        await addDoc(collection(db, 'supporters'), payload);
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.CREATE, 'supporters');
        } catch (e) {
          console.warn('Supporter email list capture:', e);
        }
      }
    };

    // Capture email list entry immediately
    recordSupporter();

    try {
      // Paystack expects amounts in the smallest currency unit (pesewas / kobo)
      // 1 GHS = 100 pesewas
      const amountInPesewas = Math.round(finalAmount * 100);

      const handler = paystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email.trim(),
        amount: amountInPesewas,
        currency: 'GHS',
        ref: `dono_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          custom_fields: [
            {
              display_name: 'Supporter Name',
              variable_name: 'supporter_name',
              value: name.trim() || 'Anonymous Supporter'
            },
            {
              display_name: 'Supporter Note',
              variable_name: 'supporter_note',
              value: note.trim() || 'No note attached'
            },
            {
              display_name: 'Channel / Project',
              variable_name: 'project',
              value: 'thebachajoshua YouTube & Visual Stories'
            }
          ]
        },
        callback: (response: { reference: string }) => {
          setIsLoading(false);
          // Record payment confirmation
          recordSupporter(response.reference);
          setPaymentSuccess({
            reference: response.reference,
            amount: finalAmount,
            donorName: name.trim() || 'Friend'
          });
        },
        onClose: () => {
          setIsLoading(false);
        }
      });

      handler.openIframe();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Could not initiate payment. Please try again.');
    }
  };

  const isTestMode = PAYSTACK_PUBLIC_KEY.startsWith('pk_test_');

  return (
    <div className="min-h-screen bg-paper text-coal font-sans selection:bg-deep-orange selection:text-white antialiased py-8 md:py-16 px-4 md:px-8 flex flex-col items-center justify-center relative">
      {/* Background aesthetic noise & motif */}
      <div className="grain fixed inset-0 pointer-events-none z-[100]" />

      {/* Decorative brutalist lines & stamps */}
      <div className="fixed top-0 left-0 w-full h-2 bg-deep-orange z-50" />
      
      <div className="w-full max-w-xl relative z-10">
        {/* Navigation & Header strip */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              if (onBackToHome) {
                onBackToHome();
              } else {
                window.location.href = '/';
              }
            }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-coal/70 hover:text-deep-orange transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>thebachajoshua.site</span>
          </button>

          {isTestMode && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber/20 border border-amber/40 text-coal text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-deep-orange animate-pulse" />
              Paystack Test Mode
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {paymentSuccess ? (
            /* SUCCESS CELEBRATION SCREEN */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-coal p-8 md:p-10 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] text-center relative overflow-hidden"
            >
              {/* Brutalist banner ribbon */}
              <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-deep-orange via-amber to-deep-blue" />

              <div className="w-16 h-16 mx-auto bg-deep-orange/10 border-2 border-deep-orange text-deep-orange flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_rgba(241,119,32,0.4)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs font-black font-technical uppercase tracking-widest text-deep-orange block mb-2">
                Payment Confirmed
              </span>

              <h2 className="text-4xl md:text-5xl font-display font-black text-coal uppercase leading-none tracking-tight mb-4">
                Thank You So Much!
              </h2>

              <p className="text-base text-coal/80 font-medium leading-relaxed mb-6 max-w-md mx-auto">
                Hey <span className="font-bold text-coal">{paymentSuccess.donorName}</span>, thank you so much for the support! You are genuinely fueling the late nights, the creative grind, and independent visual storytelling.
              </p>

              <div className="p-4 bg-paper border border-coal/15 text-left mb-8 text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-coal/60 uppercase">Amount Contributed:</span>
                  <span className="font-bold text-coal">GH₵ {paymentSuccess.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coal/60 uppercase">Reference:</span>
                  <span className="text-coal/80 truncate max-w-[200px]">{paymentSuccess.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coal/60 uppercase">Status:</span>
                  <span className="text-green-600 font-bold uppercase">Success</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setPaymentSuccess(null);
                    setSelectedPreset(10);
                    setCustomAmount('');
                    setNote('');
                  }}
                  className="flex-1 py-3 px-6 bg-paper border border-coal text-coal text-xs font-black uppercase tracking-wider hover:bg-coal hover:text-white transition-all cursor-pointer"
                >
                  Make Another Contribution
                </button>
                <button
                  onClick={() => {
                    if (onBackToHome) {
                      onBackToHome();
                    } else {
                      window.location.href = '/';
                    }
                  }}
                  className="flex-1 py-3 px-6 bg-deep-orange text-white text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(4,116,186,1)] hover:bg-coal transition-all cursor-pointer"
                >
                  Explore Portfolio
                </button>
              </div>
            </motion.div>
          ) : (
            /* MAIN SUPPORT FORM */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-2 border-coal p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] relative"
            >
              {/* Header section */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-5xl font-display font-black text-coal uppercase leading-tight tracking-tight mb-2">
                  Support
                </h1>

                <p className="text-sm text-coal/80 leading-relaxed font-medium">
                  TYSM for clicking the link. You can support the channel and my work right here.
                </p>
              </div>

              {/* Amount Selection Section */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {PRESET_AMOUNTS.map((amount) => {
                    const isSelected = selectedPreset === amount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handlePresetClick(amount)}
                        className={`py-3 px-2 border-2 text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-deep-orange bg-deep-orange/10 shadow-[3px_3px_0px_0px_rgba(241,119,32,1)]'
                            : 'border-coal/20 bg-paper/60 hover:border-coal hover:bg-white'
                        }`}
                      >
                        <span className="font-display text-lg md:text-xl font-black text-coal">
                          GH₵ {amount}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="font-display font-bold text-sm text-coal/60">GH₵</span>
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className={`w-full pl-12 pr-4 py-2.5 bg-paper/60 border-2 text-sm font-bold text-coal focus:outline-none transition-all ${
                      selectedPreset === null && customAmount !== ''
                        ? 'border-deep-orange bg-white shadow-[3px_3px_0px_0px_rgba(241,119,32,1)]'
                        : 'border-coal/20 focus:border-coal focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              {/* Supporter Details */}
              <div className="space-y-3 mb-6 pt-4 border-t border-coal/10">
                <div>
                  <label className="block text-xs font-bold text-coal mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage(null);
                    }}
                    className="w-full px-3 py-2 bg-paper/60 border-2 border-coal/20 text-sm text-coal focus:outline-none focus:border-coal focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-coal">Name</label>
                    <span className="text-[10px] uppercase text-coal/40">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-paper/60 border-2 border-coal/20 text-sm text-coal focus:outline-none focus:border-coal focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-coal">Note</label>
                    <span className="text-[10px] uppercase text-coal/40">Optional</span>
                  </div>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3 py-2 bg-paper/60 border-2 border-coal/20 text-sm text-coal focus:outline-none focus:border-coal focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-300 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={handlePay}
                className="w-full py-3.5 px-6 bg-coal text-white font-display text-base uppercase tracking-wider flex items-center justify-center gap-2 border border-deep-blue/20 shadow-[3px_3px_0px_0px_rgba(241,119,32,1)] hover:bg-deep-orange hover:shadow-[3px_3px_0px_0px_rgba(4,116,186,1)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening Paystack...
                  </span>
                ) : (
                  <span>Support With GH₵ {finalAmount > 0 ? finalAmount.toFixed(2) : '0.00'}</span>
                )}
              </button>

              {/* Supported Payment Channels */}
              <div className="mt-4 pt-4 border-t border-coal/10 flex items-center justify-between text-[11px] text-coal/50 flex-wrap gap-2">
                <span>MoMo • Cards • Bank</span>
                <span>Secured by Paystack</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <div className="text-center mt-6">
          <p className="text-[11px] uppercase tracking-widest text-coal/40">
            thebachajoshua.site
          </p>
        </div>
      </div>
    </div>
  );
};
