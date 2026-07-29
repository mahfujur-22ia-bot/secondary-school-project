import { useEffect, useState } from 'react';
import i18n from '../i18n';

export function useI18n() {
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => setLanguage(lng);
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, []);

  const t = (key, options) => i18n.t(key, options);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('school-site-lang', lng);
  };

  return { t, changeLanguage, language, i18n };
}
