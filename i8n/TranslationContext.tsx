import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { translations } from "./translations";

import { useState, useMemo, useContext, createContext } from "react";

//add interface

export const LocaleContext = createContext({
  useTranslate: (transText: string) => "",
  currentLanguageCode: "",
  setCurrentLanguageCode: () => {},
});

export const LocaleProvider = ({ children }: any) => {
  const [currentLanguageCode, setCurrentLanguageCode] = useState(
    Localization.getLocales()[0]["languageCode"]
  );
  const i18n = new I18n(translations);

  i18n.locale = currentLanguageCode;
  i18n.enableFallback = true;

  //const useTranslate
  const useTranslate = (transText: string) => {
    return i18n.t(transText);
  };

  const localeVals = useMemo(
    () => ({
      useTranslate,
      currentLanguageCode,
      setCurrentLanguageCode,
    }),
    [useTranslate, setCurrentLanguageCode, currentLanguageCode]
  );

  return (
    <LocaleContext.Provider value={localeVals}>
      {children}
    </LocaleContext.Provider>
  );
};
export const useLocale = () => useContext(LocaleContext);
