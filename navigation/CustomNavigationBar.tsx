import { useTheme, Appbar } from "react-native-paper";

import { useBreakpoint } from "../hooks/useBreakpoint";

export function CustomNavigationBar({ navigation }) {
  const { breakpoint } = useBreakpoint();
  const theme = useTheme();
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Heard" />
      <Appbar.Action icon="bell" onPress={() => navigation.closeDrawer()} />
    </Appbar.Header>
  );
}
//<DarkModeSwitch />
