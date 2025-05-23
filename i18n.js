import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "ru",
        lng: "ru",
        resources: {
            en: {
                translations: import("./public/locales/en/translation.json")
            },
            ru: {
                translations: import("./public/locales/ru/translation.json")
            }
        },
        ns: ["translations"],
        defaultNS: "translations",
        react: {
            useSuspense: false,
        },
    })
i18n.languages = ["ru", "en"];
export default i18n;