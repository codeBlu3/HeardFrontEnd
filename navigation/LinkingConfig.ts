import * as Linking from "expo-linking";
import { MessagingNavConfig } from "../modules/messaging/NavConfig";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      MainDraw: {
        path: "main",
        screens: {
          Uploads: "uploads",
          UserInfo: "userinfo",
          ...MessagingNavConfig,

          Job: {
            path: "jobs",
            screens: {
              JobScreen: "joblist",
              //DpKdistanceSelectionScreen: {path:" dpkdistance/:jobID"}
              DpKdistanceSelectionScreen: "dpkdistance/:jobID",
              DpResultsScreen: "dpresult/:jobID",
            },
          },
          CrossMatchingStack: {
            path: "crossmatch",
            screens: {},
          },
        },
      },
      SignIn: "signin",
      SignUp: "signup",
      SuccessRedir: "success",
    },
  },
};

/*
          Messages: {
	    path: "messages",
            screens: {
              Inbox: "inbox",
              NewMessage: "newmessage",
             Conversation: "conversation/:conversationID",
            },
	  },

*/
