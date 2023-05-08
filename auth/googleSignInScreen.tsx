import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useConstants } from "../constants/ConstantsContext";
import { useAuth, AuthContext } from "./AuthContext";
import { Platform, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Switch,
  TextInput,
  // Button,
  Card,
  Divider,
  useTheme as rnpUseTheme,
} from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
export function GoogleSignInScreen({ navigation }) {
  const [result, setResult] = React.useState(null);

  const SERVERHOSTNAME = useConstants();
  const { googleSignIn, setCurrentAuthenticatedUser }: any = useAuth();
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openAuthSessionAsync(
      `http://${SERVERHOSTNAME}:4000/auth/google`,
      `http://${SERVERHOSTNAME}:19006/success`
    );
    //  setResult(result);
    if (result.type == "success") {
      googleSignIn();
    } else {
      navigation.navigate("SignIn");
    }
  };

  return (

    <SafeAreaView>
    <View>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
    </SafeAreaView>
  );
}
/*
  //should be just a button
//  const { signIn } = React.useContext(AuthContext);
//  const linkTo = useLinkTo();

  const { googleSignIn, setCurrentAuthenticatedUser }: any = useAuth();

  
*/
export function SuccessRedirScreen() {
  //const { signIn } = React.useContext(AuthContext);
  React.useEffect(() => {
    const purgeUserToken = async () => {
      await AsyncStorage.removeItem("userToken");
      console.log("purge");
    };
    purgeUserToken();

    async function getToken() {
      let userToken = await AsyncStorage.getItem("userToken");
      return userToken;
    }
    const token = getToken();
    console.log(token);
  });
  WebBrowser.maybeCompleteAuthSession();
  return (
    <View>
      <Text>redirecting</Text>
    </View>
  );
}

/*
transfer to local signin
 */
