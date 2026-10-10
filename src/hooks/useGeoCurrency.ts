import { useState, useEffect, useCallback } from 'react';

// The strictly supported African countries mapped to their currency codes.
// Any other country in the world defaults to 'USD'.
export const AFRICAN_COUNTRY_CURRENCY_MAP: Record<string, string> = {
  GH: 'GHS', // Ghana -> Ghanaian Cedi
  NG: 'NGN', // Nigeria -> Nigerian Naira
  ZA: 'ZAR', // South Africa -> South African Rand
  KE: 'KES', // Kenya -> Kenyan Shilling
  RW: 'RWF', // Rwanda -> Rwandan Franc
};

const STORAGE_KEY_SAVED_CURRENCY = 'user_preferred_currency';
const STORAGE_KEY_CACHED_COUNTRY = 'user_detected_country';

/**
 * Synchronous timezone-based heuristic to prevent UI flash
 * before the IP lookup finishes.
 */
function detectTimezoneCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Accra')) return 'GHS';
    if (tz.includes('Lagos')) return 'NGN';
    if (tz.includes('Johannesburg')) return 'ZAR';
    if (tz.includes('Nairobi')) return 'KES';
    if (tz.includes('Kigali')) return 'RWF';
  } catch {
    // ignore
  }
  return 'USD';
}

/**
 * Maps a two-letter ISO country code to one of the 5 African currencies,
 * otherwise defaults strictly to 'USD'.
 */
export function mapCountryCodeToCurrency(countryCode: string | null | undefined): string {
  if (!countryCode) return 'USD';
  const upper = countryCode.trim().toUpperCase();
  return AFRICAN_COUNTRY_CURRENCY_MAP[upper] || 'USD';
}

export interface UseGeoCurrencyResult {
  currencyCode: string;
  countryCode: string | null;
  isDetecting: boolean;
  isManualOverride: boolean;
  setCurrencyCode: (newCode: string, isManual?: boolean) => void;
}

/**
 * Custom React Hook that uses an IP-based Geolocation API
 * to detect the user's country and initialize their currency state.
 *
 * Defaults to USD if the detected country is not among the 5 supported African countries.
 */
export function useGeoCurrency(defaultFallback = 'USD'): UseGeoCurrencyResult {
  const [currencyCode, setCurrencyCodeState] = useState<string>(() => {
    // 1. Check if user already manually picked a currency in a previous session
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_SAVED_CURRENCY);
      if (saved) return saved;
    } catch {}

    // 2. Check if country was already resolved in this session
    try {
      const cachedCountry = sessionStorage.getItem(STORAGE_KEY_CACHED_COUNTRY);
      if (cachedCountry) return mapCountryCodeToCurrency(cachedCountry);
    } catch {}

    // 3. Instant zero-latency timezone detection to avoid initial render flash
    const tzInitial = detectTimezoneCurrency();
    return tzInitial || defaultFallback;
  });

  const [countryCode, setCountryCode] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_CACHED_COUNTRY) || null;
    } catch {
      return null;
    }
  });

  const [isManualOverride, setIsManualOverride] = useState<boolean>(() => {
    try {
      return Boolean(sessionStorage.getItem(STORAGE_KEY_SAVED_CURRENCY));
    } catch {
      return false;
    }
  });

  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  // Manual currency change handler
  const setCurrencyCode = useCallback((newCode: string, isManual = true) => {
    setCurrencyCodeState(newCode);
    if (isManual) {
      setIsManualOverride(true);
      try {
        sessionStorage.setItem(STORAGE_KEY_SAVED_CURRENCY, newCode);
      } catch {}
    }
  }, []);

  // IP Geolocation detection effect
  useEffect(() => {
    // If the user already manually selected a currency, respect their choice
    if (isManualOverride) return;

    // If country is already cached in session, no need to make network request
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY_CACHED_COUNTRY);
      if (cached) {
        setCountryCode(cached);
        const resolved = mapCountryCodeToCurrency(cached);
        setCurrencyCodeState(resolved);
        return;
      }
    } catch {}

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    setIsDetecting(true);

    // Primary endpoint: api.country.is (fast, HTTPS, CORS-enabled, zero auth)
    fetch('https://api.country.is/', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const country = data?.country;
        if (country && typeof country === 'string') {
          const resolvedCurrency = mapCountryCodeToCurrency(country);
          setCountryCode(country.toUpperCase());
          setCurrencyCodeState(resolvedCurrency);

          try {
            sessionStorage.setItem(STORAGE_KEY_CACHED_COUNTRY, country.toUpperCase());
          } catch {}
        }
      })
      .catch(() => {
        // Fallback: If primary fails or is blocked by an ad-blocker,
        // timezone fallback is already loaded synchronously.
      })
      .finally(() => {
        clearTimeout(timeoutId);
        if (isMounted) setIsDetecting(false);
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [isManualOverride]);

  return {
    currencyCode,
    countryCode,
    isDetecting,
    isManualOverride,
    setCurrencyCode,
  };
}
