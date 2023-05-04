import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../theme/ThemeContext";
import LinkingConfig from "./LinkingConfig";

export const NavigationWrapper = ({ children }: any) => {
  const { themeUsed } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={themeUsed} linking={LinkingConfig}>
      {children}
    </NavigationContainer>
  );
};

// <NavigationContainer value={themePreferences}  linking={LinkingConfig}>
