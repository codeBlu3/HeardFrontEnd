//import React,  {useContext, useReducer, createContext} from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useConstants } from "../constants/ConstantsContext";

export const GraphqlProvider = ({ children }: any) => {
  const SERVERHOSTNAME = useConstants();
  //const apolloUrl= `http://{SERVERHOSTNAME}:7000` // should be full protocol, change upon full deployment
  const client = new ApolloClient({
    uri: `http://${SERVERHOSTNAME}:7000/`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
