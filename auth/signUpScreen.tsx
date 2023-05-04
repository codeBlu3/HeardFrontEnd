import React from "react";
import { Platform, View } from "react-native";
import { Text, TextInput, Button, Card, Divider } from "react-native-paper";
import { useLinkTo } from "@react-navigation/native";

//const SERVERHOSTNAME: string = Constants.expoConfig.extra.SERVERHOSTNAME;

import { useBreakpoint } from "../hooks/useBreakpoint";
import { useAuth } from "./AuthContext";
import { useLocale } from "../i8n/TranslationContext";
import { useConstants } from "../constants/ConstantsContext";

export function SignUpScreen({ navigation }) {
  const SERVERHOSTNAME = useConstants();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  //  const linkTo = useLinkTo();

  async function handleSignUp(username: string, password: string) {
    let postUrl = `http://${SERVERHOSTNAME}:4000/register`;
    const jsonBody = JSON.stringify({ username: username, password: password });
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: jsonBody,
    };

    const response = await fetch(postUrl, fetchOptions);
    console.log(response);
    let result = await response.json();
    console.log(result);
    if (result.status == "User Created") {
      navigation.navigate("SignIn");
      // dispatch signIn()
      alert("user was created, please login"); // should be a modal screen
    } else {
      alert("user was not created, please create again");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 400 }}>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={() => handleSignUp(username, password)}
          >
            Sign Up
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
