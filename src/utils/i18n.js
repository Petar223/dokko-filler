import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import sr from '../locales/sr.json';

export const LANGUAGES = ['sr', 'en'];
const STORAGE_KEY = 'dokko-language';
const HTML_LANG = { sr: 'sr-Latn', en: 'en' };

const savedLanguage = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

i18n.use(initReactI18next).init({
  resources: { sr: { translation: sr }, en: { translation: en } },
  // ponytail: Serbian unless the user picked English in the header. Add
  // browser-language detection here if English should be automatic.
  lng: LANGUAGES.includes(savedLanguage()) ? savedLanguage() : 'sr',
  fallbackLng: 'sr',
  // React already escapes rendered text.
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = HTML_LANG[language] ?? language;
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Private mode: the choice just isn't remembered.
  }
});

export default i18n;
