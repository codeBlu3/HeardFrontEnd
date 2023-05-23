import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InboxScreen } from "./InboxScreen";
import { ConversationScreen } from "./ConversationScreen";
import { NewMessageScreen } from "./NewMessageScreen";

export function MessagingStack() {
  const MessagingStackNav = createNativeStackNavigator();
  return (
    <MessagingStackNav.Navigator
      initialRouteName="Inbox"
      screenOptions={{ headerShown: false }}
    >
      <MessagingStackNav.Screen name="Inbox" component={InboxScreen} />
      <MessagingStackNav.Screen
        name="NewMessage"
        component={NewMessageScreen}
      />

      <MessagingStackNav.Screen
        name="Conversation"
        component={ConversationScreen}
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
