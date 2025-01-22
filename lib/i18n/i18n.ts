import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import common from "../../public/locales/zh-CN/common.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      lookupQuerystring: "lang",
    },
    fallbackLng: "zh-CN",
    supportedLngs: ["zh-CN", "en-US", "zh-HK"],
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "common",
    ns: ["common"],
    react: {
      useSuspense: false,
    },
  });

i18n.addResourceBundle("zh-CN", "common", common);

export default i18n;
