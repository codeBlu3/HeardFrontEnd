import React, { useContext, useReducer, createContext } from "react";
import { useConstants } from "../constants/ConstantsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
//somehow flawed tong authentication logig

export const AuthContext = React.createContext({
  localSignIn: () => {},
  googleSignIn: () => {},
  signOut: () => {},
  signUp: () => {},
  setCurrentAuthenticatedUser: () => {},
  currentAuthenticatedUser: null,
  currentUserName: null,
  authState: {},
});
//revert to  react navigation style
/*
export const AuthContext = createContext({});

*/
export const lTokenTransform = (prevState: any, action: any) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

export const initialTokenState = {
  isLoading: true,
  isSignout: true,
  userToken: null,
};
// Auth
export const AuthProvider = ({ children }: any) => {
  const [currentAuthenticatedUser, setCurrentAuthenticatedUser] =
    React.useState("");

  const [currentUserName, setCurrentUserName] = React.useState("");
  const SERVERHOSTNAME = useConstants();

  const [authState, dispatch] = React.useReducer(
    lTokenTransform,
    initialTokenState
  );
  //useEffect, add sticky session
  React.useEffect(() => {
    async function tokenRestoreCheck() {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        if (userToken != null) {
          const resp = await fetch(
            `http://${SERVERHOSTNAME}:4000/auth/bearer`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
              credentials: "include",
            }
          );
          // direct signIn() /not possible have to use context
          //          console.log(resp);
          //         let res2 = await fetch(`http://${SERVERHOSTNAME}:4000/user`, {
          //           credentials: "include",
          //         });
          //        console.log(res2);
          const getUserToken = async () => {
            let resp = await fetch(`http://${SERVERHOSTNAME}:4000/user`, {
              credentials: "include",
            });
            console.log(resp);

            let result = await resp.json();
            console.log(result);
            const token = await result.userToken;
            const userID = await result.userID;
            const username = await result.username;
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("userID", userID);
            setCurrentAuthenticatedUser(userID);
            setCurrentUserName(username);
            //get user preferences
            return token;
          };

          if (resp.status == 200) {
            //const result = await res2.json();
            //const resUserToken = await result.userToken;

            const userToken = await getUserToken();
            dispatch({ type: "RESTORE_TOKEN", token: userToken });
            //console.log(resUserToken);
            //console.log(userToken);
            //if (resUserToken == userToken) {
            //}
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    tokenRestoreCheck();
  }, []);

  /*
   */
  const authVals = React.useMemo(
    () => ({
      localSignIn: async (username: string, password: string) => {
        //sign in via session
        //console.log("signIn");
        const postUrl = `http://${SERVERHOSTNAME}:4000/login`;
        const jsonBody = JSON.stringify({
          username: username,
          password: password,
        });
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

        const getUserToken = async () => {
          let resp = await fetch(`http://${SERVERHOSTNAME}:4000/user`, {
            credentials: "include",
          });
          console.log(resp);

          let result = await resp.json();
          console.log(result);
          const token = await result.userToken;
          const userID = await result.userID;
          const username = await result.username;
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("userID", userID);
          setCurrentAuthenticatedUser(userID);
          setCurrentUserName(username);
          //get user preferences
          return token;
        };

        if (result.loginStatus == "success") {
          //setCurrentAuthenticatedUser(result.userID);
          console.log(result);
          const userToken = await getUserToken();
          dispatch({ type: "SIGN_IN", token: userToken });
        } else {
          alert("Invalid login , please try again");
        }

        //        const userToken = await getUserToken();
      },

      googleSignIn: async () => {
        const getUserToken = async () => {
          let resp = await fetch(`http://${SERVERHOSTNAME}:4000/user`, {
            credentials: "include",
          });

          let result = await resp.json();
          const token = await result.userToken;
          const userID = await result.userID;
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("userID", userID);
          setCurrentAuthenticatedUser(userID);
          //get user preferences
          return token;
        };

        const userToken = await getUserToken();
        console.log(userToken);

        dispatch({ type: "SIGN_IN", token: userToken });
      },
      signOut: () => {
        const purgeUserToken = async () => {
          await AsyncStorage.removeItem("userToken");
          //         await AsyncStorage.removeItem("userID");
        };
        //      console.log("signOut");
        //delete cache
        purgeUserToken();

        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async () => {
        //this might not be used as, all sign up will be redirected to sign in
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },

      currentAuthenticatedUser,
      currentUserName,
      setCurrentAuthenticatedUser,
      authState,
    }),
    [currentAuthenticatedUser, setCurrentAuthenticatedUser, authState]
  );

  return (
    <AuthContext.Provider value={authVals}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
