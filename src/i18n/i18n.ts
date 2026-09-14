import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./messages/en.json";
import ar from "./messages/ar.json";

export const defaultNS = "translation";

export const resources = {
  en: { [defaultNS]: en },
  ar: { [defaultNS]: ar },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    // lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    defaultNS,
    resources,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const updateDocumentAttributes = (lng: string) => {
  document.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
};

// Set attributes immediately on app initial load
updateDocumentAttributes(i18n.resolvedLanguage || i18n.language);

i18n.on("languageChanged", (lng) => {
  updateDocumentAttributes(lng);
});

export default i18n;
