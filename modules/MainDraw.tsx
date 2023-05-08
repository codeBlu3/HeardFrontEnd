import React from "react";

import { View } from "react-native";
import {
  useTheme,
  Appbar,
  TouchableRipple,
  Switch,
  Badge,
  Text,
  Button,
} from "react-native-paper";
//import { PreferencesContext } from "../themes/PreferencesContext";

//import { AuthContext } from "../auth/AuthContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

import { CustomDrawerContent } from "../navigation/CustomDrawerContent";
import { CustomNavigationBar} from "../navigation/CustomNavigationBar";

import { UserInfoScreen } from "./userInfo/UserInfoScreen";
import { MessagingScreen } from "./messaging/MessagingScreen";
import { MessagingStack} from "./messaging/MessagingStack";

import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

import { useThemeContext } from "../theme/ThemeContext";

const DarkModeSwitch = () => {
  const { toggleTheme, isThemeDark } = useThemeContext();
  return <Switch value={isThemeDark} onValueChange={toggleTheme} />;
};

export function MainDraw() {
  const { breakpoint } = useBreakpoint();
  return (
    <Drawer.Navigator
      initialRouteName="UserInfo"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Drawer.Screen name="Messages" component={MessagingStack} />
      <Drawer.Screen name="UserInfo" component={UserInfoScreen} />
    </Drawer.Navigator>
  );
}





  /*
// Dump codes

        style = {{
          backgroundColor: theme.colors.secondary,
        }}

<Appbar
        style = {{
          backgroundColor: theme.colors.secondary,
        }}
 >

</Appbar>
      <Button onPress= {() => alert('aw')}>
      test
      </Button>

        style={{ alignItems: "center" }}
 
}
  */
//screens
/*
import { UploadScreen } from "../modules/upload/UploadScreen";
import { JobStack } from "../modules/job/JobStack";
import { DedupeStack } from "../modules/deduplication/DedupeStack"; //screen lang dapat to  dalawa
import { CrossMatchingStack } from "../modules/crossmatching/CrossMatchingStack"; //screen lang dapat

*/

/*
     <Drawer.Screen name="Uploads" component={UploadScreen} />
      <Drawer.Screen name="Job" component={JobStack} />
      <Drawer.Screen name="Dedupe" component={DedupeStack} />
      <Drawer.Screen name="CrossMatching" component={CrossMatchingStack} />

*/

/*
function rightSwitch() {
  const { isThemeDark } = React.useContext(PreferencesContext);
  return <Switch color={"red"} value={isThemeDark} />;
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
      {breakpoint === "sm" ? null : (

 
<>
      <Button mode="text" onPress={() => navigation.navigate('Messages')}>
     Messages
	   </Button>
     <Button mode="text" labelStyle={{color:theme.colors.tertiary}}  onPress={() => navigation.navigate('UserInfo')}>
    UserInfo 
	   </Button>
</>

      {breakpoint === "sm" ? (
      ) : null}
 
      )}



*/
/*
     <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Toggle Theme" onPress={() => alert('test')} />
      <DrawerItem label="Log Out" onPress={() => alert('test')} />
<DarkModeSwitch />
    </DrawerContentScrollView>
        <Drawernp.Item
          label="Toggle Theme"
          onPress={() => toggleTheme()}
          right={rightSwitch}
        />

 
*/

/*
//        drawerType: breakpoint === "sm" ? "front" : "permanent", // 
     <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: breakpoint === "sm" ? "front" : "permanent",
        header: (props) => <CustomNavigationBar {...props} />,
      }}
 
*/
