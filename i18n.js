import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
      en: {
        translations: require('./public/locales/en/translation.json')
      },
      ru: {
        translations: require('./public/locales/ru/translation.json')
      }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    react: {
      useSuspense: true
    }
  })
i18n.languages = ['en', 'ru'];
export default i18n;