import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../auth/AuthContext";
import { useLocale } from "../i8n/TranslationContext";
import { SignUpScreen } from "../auth/signUpScreen";
import { SignInScreen } from "../auth/signInScreen";
import {
  GoogleSignInScreen,
  SuccessRedirScreen,
} from "../auth/googleSignInScreen";

import { MainDraw } from "../modules/MainDraw";
import { SafeAreaView } from "react-native-safe-area-context";

//Transfer graphql and socketIO here
const AuthStack = createNativeStackNavigator();
export const AuthNavigator = () => {
  const { useTranslate } = useLocale();
  const { authState } = useAuth();
  return (
    <AuthStack.Navigator>
      {authState.userToken == null ? (
        <AuthStack.Group screenOptions={{ headerShown: false }}>
          <AuthStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: useTranslate("SignIn"),
            }}
          />
          <AuthStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: useTranslate("SignUp"),
            }}
          />
          <AuthStack.Screen
            name="GoogleSignIn"
            component={GoogleSignInScreen}
            options={{
              title: "GoogleSignIn",
            }}
          />

          <AuthStack.Screen
            name="SuccessRedir"
            component={SuccessRedirScreen}
            options={{
              title: "SuccessRedir",
            }}
          />
        </AuthStack.Group>
      ) : (
        <AuthStack.Group screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="MainDraw" component={MainDraw} />
        </AuthStack.Group>
      )}
    </AuthStack.Navigator>
  );
};

/*
add authenticated providers here
add graphql, add socketio
<SafeAreaView >
</SafeAreaView >

*/
