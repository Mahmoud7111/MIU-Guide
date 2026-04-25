/**
 * @fileoverview Language / internationalisation context for MIU.
 *
 * Supports English ('en') and Arabic ('ar'). Switching to Arabic sets the
 * `dir="rtl"` attribute on <html> so that the entire page layout flips
 * correctly without any per-component direction logic.
 *
 * localStorage key: miu_lang — 'en' | 'ar'
 */

import { createContext, useContext, useState, useEffect } from 'react';

/* -------------------------------------------------------------------------- */
/*                                  CONTEXT                                    */
/* -------------------------------------------------------------------------- */

/** @type {React.Context<LanguageContextValue|null>} */
const LanguageContext = createContext(null);

/* -------------------------------------------------------------------------- */
/*                                  PROVIDER                                   */
/* -------------------------------------------------------------------------- */

/**
 * Provides language state and setter to the entire component tree.
 * Place this at (or near) the root of your application, alongside
 * ThemeProvider and AuthProvider.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // Initialise from storage synchronously to avoid a flash of wrong direction
    return localStorage.getItem('miu_lang') || 'en';
  });

  /* ---- Apply dir attribute to DOM + persist on every change ---- */
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('miu_lang', lang);
  }, [lang]);

  /* ---- Action ---- */

  /**
   * Changes the active language.
   * Also updates the HTML dir and lang attributes and persists the choice.
   *
   * @param {'en'|'ar'} newLang - The language code to switch to.
   */
  function setLang(newLang) {
    if (newLang !== 'en' && newLang !== 'ar') {
      console.warn(`[LanguageContext] Unsupported language "${newLang}". Defaulting to 'en'.`);
      setLangState('en');
      return;
    }
    setLangState(newLang);
  }

  /* ---- Context value ---- */

  /**
   * @typedef {Object} LanguageContextValue
   * @property {'en'|'ar'} lang    - Current active language code.
   * @property {Function}  setLang - Sets a new language ('en' | 'ar').
   * @property {boolean}   isRTL   - True when the active language is right-to-left.
   */
  const value = {
    lang,
    setLang,
    isRTL: lang === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CUSTOM HOOK                                  */
/* -------------------------------------------------------------------------- */

/**
 * Access the language context from any component inside LanguageProvider.
 *
 * @returns {LanguageContextValue}
 * @throws {Error} When called outside of a LanguageProvider subtree.
 *
 * @example
 * const { lang, setLang, isRTL } = useLanguage();
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (ctx === null) {
    throw new Error(
      'useLanguage() must be called inside a <LanguageProvider>. ' +
        'Ensure your component is rendered within the provider tree.'
    );
  }

  return ctx;
}
