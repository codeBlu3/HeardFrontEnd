import * as React from "react";
import { Text } from "react-native-paper";

import { useBreakpoint } from "../hooks/useBreakpoint";

export function RSText(props) {
  const { width, breakpoint } = useBreakpoint();
  // should this one be part of state

  const variantMap = {
    sm: "headlineSmall",
    md: "headlineMedium",
    lg: "headlineLarge",
  };

  return <Text variant={variantMap[breakpoint]} {...props} />;
}

//xl: "headlineLarge",
//xs: "headlineSmall",
