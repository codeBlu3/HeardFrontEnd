import React from "react";
import socketio from "socket.io-client";
import { useConstants } from "../constants/ConstantsContext";
//import { SOCKET_URL } from "config";

export const SocketContext = React.createContext({});

export const SocketProvider = ({ children }: any) => {
  const SERVERHOSTNAME = useConstants();
  const SOCKET_URL = `http://${SERVERHOSTNAME}:5000`;
  const socket = socketio.connect(SOCKET_URL, { withCredentials: true });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
