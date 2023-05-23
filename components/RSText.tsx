import * as React from "react";
import { Text } from "react-native-paper";

import { useBreakpoint } from "../hooks/useBreakpoint";

export function RSBody(props) {
  const { breakpoint } = useBreakpoint();
  // should this one be part of state
  //  console.log(props)

  const variantMap = {
    sm: "bodySmall",
    md: "bodyMedium",
    lg: "bodyLarge",
  };

  return <Text variant={variantMap[breakpoint]} {...props} />;
}

export function RSHeadline(props) {
  const { breakpoint } = useBreakpoint();
  // should this one be part of state
  //  console.log(props)

  const variantMap = {
    sm: "bodySmall",
    md: "bodyMedium",
    lg: "bodyLarge",
  };

  return <Text variant={variantMap[breakpoint]} {...props} />;
}

//xl: "headlineLarge",
//xs: "headlineSmall",
