import { useColorScheme } from "react-native";
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";

import { CombinedLightTheme, CombinedDarkTheme } from "./themingConfig";

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
  themeUsed: {},
});

export const ThemeProvider = ({ children }: any) => {
  const colorScheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = useState(colorScheme === "dark");
  const [themeUsed, setThemeUsed] = useState(
    isThemeDark ? CombinedDarkTheme : CombinedLightTheme
  );

  useEffect(() => {
    setThemeUsed(isThemeDark ? CombinedDarkTheme : CombinedLightTheme);
  }, [isThemeDark]);

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const themePreferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      themeUsed,
    }),
    [toggleTheme, isThemeDark, themeUsed]
  );

  return (
    <ThemeContext.Provider value={themePreferences}>
      {children}
    </ThemeContext.Provider>
  );
};

import { Provider as PaperProvider } from "react-native-paper";
export const PaperWrapper = ({ children }: any) => {
  const { themeUsed } = useContext(ThemeContext);
  return <PaperProvider theme={themeUsed}>{children}</PaperProvider>;
};

export const useThemeContext = () => useContext(ThemeContext);
