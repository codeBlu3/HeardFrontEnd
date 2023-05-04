import React from "react";
import { Platform, View } from "react-native";
import {
  Text,
  Switch,
  TextInput,
  Button,
  Card,
  Divider,
  useTheme as rnpUseTheme,
} from "react-native-paper";
import { useLinkTo } from "@react-navigation/native";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";

import { useBreakpoint } from "../hooks/useBreakpoint";
import { useAuth, AuthContext } from "./AuthContext";
import { useLocale } from "../i8n/TranslationContext";
import { useThemeContext } from "../theme/ThemeContext";

import { useConstants } from "../constants/ConstantsContext";
//const SERVERHOSTNAME: string = Constants.expoConfig.extra.SERVERHOSTNAME;
//this should be on top constanst
//const AUTH_URL = `http://localhost:4000`;

const DarkModeSwitch = () => {
  const { toggleTheme, isThemeDark } = useThemeContext();
  return <Switch value={isThemeDark} onValueChange={toggleTheme} />;
};

const PickerComp = () => {
  const { currentLanguageCode, setCurrentLanguageCode } = useLocale();
  return (
    <Picker
      selectedValue={currentLanguageCode}
      onValueChange={(itemValue, itemIndex) =>
        setCurrentLanguageCode(itemValue)
      }
    >
      <Picker.Item label="English" value="en" />
      <Picker.Item label="Spanish" value="es" />
      <Picker.Item label="French" value="fr" />
      <Picker.Item label="中文" value="zh" />
      <Picker.Item label="한국어" value="ko" />
      <Picker.Item label="日本語" value="ja" />
    </Picker>
  );
};

export function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  // add isPasswordVisible
  //convert this to ref

  //  const SERVERHOSTNAME = useConstants();
  const { localSignIn, setCurrentAuthenticatedUser }: any = useAuth();
  const { useTranslate } = useLocale();

  const linkTo = useLinkTo();
  const { width, breakpoint } = useBreakpoint();
  //const {useTheme} = rnpUseTheme()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 400 }}>
        <Card.Content>
          <DarkModeSwitch />
          <PickerComp />
          <TextInput
            mode="outlined"
            label={useTranslate("Username")}
            value={username}
            onChangeText={setUsername}
          />
          <Divider style={{ margin: 5 }} />
          <TextInput
            mode="outlined"
            label={useTranslate("Password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Divider style={{ margin: 5 }} />
          <Button
            mode="contained"
            compact={false}
            onPress={() => localSignIn(username, password)}
          >
            <Text variant="headlineMedium">{useTranslate("SignIn")}</Text>
          </Button>

          <Divider style={{ margin: 5 }} />
          <Button
            mode="contained"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text variant="headlineMedium">Register</Text>
          </Button>
          <Divider style={{ margin: 5 }} />
          <Button
            mode="contained"
            onPress={() => navigation.navigate("GoogleSignIn")}
          >
            <Text variant="headlineMedium">SignIn using google</Text>
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
// sign in using google.com
/*
// text as responsive text
          <Button mode="contained" onPress={() => linkTo("/signup")}>
            <Text variant="headlineMedium">Register</Text>
          </Button>

*/
/*
  async function handleSignIn(username: string, password: string) {
    let postUrl = `http://${SERVERHOSTNAME}:4000/login`;
    const jsonBody = JSON.stringify({ username: username, password: password });
    const fetchOptions = {
credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: jsonBody,
    };

    const response = await fetch(postUrl, fetchOptions);
    //console.log(response);
    let result = await response.json();
    console.log(result)
          let resp = await fetch(`http://${SERVERHOSTNAME}:4000/user`, {
            credentials: "include",

          });
	  console.log(resp)

	

    if (result.loginStatus == "success") {
      //setCurrentAuthenticatedUser(result.userID);
      signIn();
    } else {
      alert("Invalid login , please try again");
    }
   
    //create drowdown from menu
    //signIn();
*/
