import Constants from "expo-constants";
import { useContext, createContext } from "react";

const SERVERHOSTNAME = Constants.expoConfig.extra.SERVERHOSTNAME;

export const ConstantsContext = createContext(SERVERHOSTNAME);

export const ConstantsProvider = ({ children }: any) => {
  return (
    <ConstantsContext.Provider value={SERVERHOSTNAME}>
      {children}
    </ConstantsContext.Provider>
  );
};
export const useConstants = () => useContext(ConstantsContext);
