import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {InboxScreen} from "./InboxScreen"
import {MessagingScreen} from "./MessagingScreen"

export function MessagingStack() {
  const MessagingStackNav = createNativeStackNavigator();
 return (
    <MessagingStackNav.Navigator initialRouteName="Inbox" screenOptions={{ headerShown: false }}>
      <MessagingStackNav.Screen
        name="Inbox"
        component={InboxScreen}
      />
      <MessagingStackNav.Screen
        name="Messaging"
        component={MessagingScreen}
      />
 
           </MessagingStackNav.Navigator>
  );

}

/*
      <MessagingStackNav.Screen
        name="CmHeaderSelection"
        component={CmHeaderSelectionScreen}
      />
      screenOptions={{ headerShown: false }}
 
*/
