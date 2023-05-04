import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      MainDraw: {
        path: "main",
        screens: {
          Uploads: "uploads",
          UserInfo: "userinfo",
          Messages: "messages",
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
