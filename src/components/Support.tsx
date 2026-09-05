import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
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
const PAYSTACK_PUBLIC_KEY = 
  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_2947262df1df97e3bf93a3907545b9644d780dc2';

interface SupportProps {
  onBackToHome?: () => void;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  presets: number[];
  defaultPreset: number;
  rateToGHS: number; // 1 unit of foreign currency = X GHS
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    presets: [1, 5, 10],
    defaultPreset: 5,
    rateToGHS: 15.5,
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    flag: '🇬🇭',
    presets: [5, 10, 20],
    defaultPreset: 10,
    rateToGHS: 1.0,
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    flag: '🇳🇬',
    presets: [1500, 5000, 10000],
    defaultPreset: 5000,
    rateToGHS: 0.010,
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    flag: '🇿🇦',
    presets: [20, 50, 100],
    defaultPreset: 50,
    rateToGHS: 0.85,
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    flag: '🇰🇪',
    presets: [150, 500, 1000],
    defaultPreset: 500,
    rateToGHS: 0.12,
  },
  RWF: {
    code: 'RWF',
    symbol: 'FRw',
    name: 'Rwandan Franc',
    flag: '🇷🇼',
    presets: [1500, 5000, 10000],
    defaultPreset: 5000,
    rateToGHS: 0.011,
  },
};

// Initial timezone detection helper
function detectInitialCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Accra')) return 'GHS';
    if (tz.includes('Lagos')) return 'NGN';
    if (tz.includes('Johannesburg')) return 'ZAR';
    if (tz.includes('Nairobi')) return 'KES';
    if (tz.includes('Kigali')) return 'RWF';
  } catch {
    // default
  }
  return 'USD';
}

function mapCountryToCurrency(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code === 'GH') return 'GHS';
  if (code === 'NG') return 'NGN';
  if (code === 'ZA') return 'ZAR';
  if (code === 'KE') return 'KES';
  if (code === 'RW') return 'RWF';
  return 'USD';
}

export const Support: React.FC<SupportProps> = ({ onBackToHome }) => {
  const [currencyCode, setCurrencyCode] = useState<string>(detectInitialCurrency);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState<boolean>(false);
  const [userManuallySelected, setUserManuallySelected] = useState<boolean>(false);
  const currencyMenuRef = useRef<HTMLDivElement>(null);

  const activeCurrency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const [selectedPreset, setSelectedPreset] = useState<number | null>(activeCurrency.defaultPreset);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    reference: string;
    amount: number;
    currencySymbol: string;
    currencyCode: string;
    donorName?: string;
  } | null>(null);

  // Close currency dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect visitor's country via lightweight Geo-IP
  useEffect(() => {
    if (userManuallySelected) return;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);

    fetch('https://api.country.is/', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data?.country && !userManuallySelected) {
          const detected = mapCountryToCurrency(data.country);
          if (CURRENCIES[detected]) {
            setCurrencyCode(detected);
            setSelectedPreset(CURRENCIES[detected].defaultPreset);
            setCustomAmount('');
          }
        }
      })
      .catch(() => {
        // Fallback already assigned synchronously from timezone
      })
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [userManuallySelected]);

  // Load Paystack Inline script on mount
  useEffect(() => {
    if ((window as any).PaystackPop) return;
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Compute final amount in chosen currency
  const finalAmount = selectedPreset !== null 
    ? selectedPreset 
    : (parseFloat(customAmount) || 0);

  // Calculate Paystack GHS equivalent charge
  const ghsEquivalent = activeCurrency.code === 'GHS'
    ? finalAmount
    : Math.max(1, Math.round(finalAmount * activeCurrency.rateToGHS));

  const handleCurrencySelect = (code: string) => {
    setUserManuallySelected(true);
    setCurrencyCode(code);
    setIsCurrencyDropdownOpen(false);
    const newConfig = CURRENCIES[code] || CURRENCIES.USD;
    setSelectedPreset(newConfig.defaultPreset);
    setCustomAmount('');
    setErrorMessage(null);
  };

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
      setErrorMessage(`Please select or enter an amount of at least ${activeCurrency.symbol} 1.`);
      return;
    }

    const paystackPop = (window as any).PaystackPop;
    if (!paystackPop) {
      setErrorMessage('Paystack is still loading. Please check your connection and try again.');
      return;
    }

    setIsLoading(true);

    // Paystack requires an email parameter even when receipts are turned off.
    // We generate an anonymous transaction identifier so checkout completes seamlessly.
    const transactionEmail = `supporter-${Date.now()}@thebachajoshua.site`;

    // Save supporter record to Firestore
    const recordSupporter = async (paymentRef?: string) => {
      try {
        const payload: Record<string, any> = {
          email: transactionEmail,
          source: 'support_page',
          createdAt: serverTimestamp(),
        };
        if (name.trim()) payload.name = name.trim();
        if (note.trim()) payload.note = note.trim();
        if (ghsEquivalent > 0) payload.amount = Number(ghsEquivalent);
        if (paymentRef) payload.reference = paymentRef;

        await addDoc(collection(db, 'supporters'), payload);
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.CREATE, 'supporters');
        } catch (e) {
          console.warn('Supporter capture:', e);
        }
      }
    };

    // Capture entry
    recordSupporter();

    try {
      // Paystack charges in subunits (pesewas: 1 GHS = 100 pesewas)
      const amountInPesewas = Math.round(ghsEquivalent * 100);

      const handler = paystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: transactionEmail,
        amount: amountInPesewas,
        currency: 'GHS',
        ref: `dono_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          custom_fields: [
            {
              display_name: 'Selected Currency',
              variable_name: 'selected_currency',
              value: activeCurrency.code
            },
            {
              display_name: 'Donation Amount',
              variable_name: 'donation_amount',
              value: `${activeCurrency.symbol} ${finalAmount}`
            },
            {
              display_name: 'Supporter Name',
              variable_name: 'supporter_name',
              value: name.trim() || 'Anonymous'
            },
            {
              display_name: 'Supporter Note',
              variable_name: 'supporter_note',
              value: note.trim() || 'None'
            }
          ]
        },
        callback: (response: { reference: string }) => {
          setIsLoading(false);
          recordSupporter(response.reference);
          setPaymentSuccess({
            reference: response.reference,
            amount: finalAmount,
            currencySymbol: activeCurrency.symbol,
            currencyCode: activeCurrency.code,
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
                  <span className="font-bold text-coal">
                    {paymentSuccess.currencySymbol} {paymentSuccess.amount.toLocaleString()} ({paymentSuccess.currencyCode})
                  </span>
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
                    setSelectedPreset(activeCurrency.defaultPreset);
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
              {/* Header section with currency selector */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-display font-black text-coal uppercase leading-tight tracking-tight mb-2">
                    Support
                  </h1>
                  <p className="text-sm text-coal/80 leading-relaxed font-medium">
                    TYSM for clicking the link. You can support the channel and my work right here.
                  </p>
                </div>

                {/* Currency dropdown selector in corner */}
                <div className="relative shrink-0" ref={currencyMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-paper/80 border-2 border-coal/30 hover:border-coal text-xs font-black text-coal transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                    aria-label="Select currency"
                  >
                    <span className="text-sm">{activeCurrency.flag}</span>
                    <span className="font-technical font-bold">{activeCurrency.code}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-coal transition-transform ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCurrencyDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border-2 border-coal shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] z-50 py-1 max-h-64 overflow-y-auto">
                      {Object.values(CURRENCIES).map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => handleCurrencySelect(c.code)}
                          className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-deep-orange/10 hover:text-deep-orange cursor-pointer transition-colors ${
                            c.code === activeCurrency.code ? 'bg-deep-orange/15 font-bold text-deep-orange' : 'text-coal'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{c.flag}</span>
                            <span>{c.code}</span>
                          </span>
                          <span className="text-coal/60 font-mono text-[11px]">{c.symbol}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Selection Section */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {activeCurrency.presets.map((amount) => {
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
                          {activeCurrency.symbol} {amount.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="font-display font-bold text-sm text-coal/60">{activeCurrency.symbol}</span>
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

              {/* Supporter Details (Email removed) */}
              <div className="space-y-3 mb-6 pt-4 border-t border-coal/10">
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
                  <span>
                    Support With {activeCurrency.symbol} {finalAmount > 0 ? finalAmount.toLocaleString() : '0'}
                  </span>
                )}
              </button>

              {activeCurrency.code !== 'GHS' && finalAmount > 0 && (
                <p className="text-[11px] text-center text-coal/50 mt-2 font-medium">
                  ≈ GH₵ {ghsEquivalent} via Paystack • your card/bank automatically converts to {activeCurrency.symbol}{finalAmount}
                </p>
              )}

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
