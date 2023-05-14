import React from "react";
import {
  Text,
  Button,
  Divider,
  TextInput,
  Avatar,
  useTheme,
} from "react-native-paper";
import { FlatList, StyleSheet, View,  ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useQuery } from "@apollo/client";
import { io } from "socket.io-client";
import { useConstants } from "../../constants/ConstantsContext";
import { useAuth} from "../../auth/AuthContext";
import { SocketContext } from "../../socket/SocketContext";
import { GET_CONVO_BY_ID } from "./requests";
;


export function ConversationScreen() {
  const route = useRoute();
  const { conversationID } = route.params;
  const {currentAuthenticatedUser, currentUserName} = useAuth()



  const [newMessage, setNewMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([ {"text": "test", "sender": "test"} ]);
  const [curRoom, setCurRoom] = React.useState(conversationID);

  const { data, loading, error } = useQuery(GET_CONVO_BY_ID, {
    variables: { conversationID },
  });


  const socket = React.useContext(SocketContext);
  //console.log(socket)

   React.useEffect(() => {
    if (data) {
    console.log(data)
      setMessageList(data.getConvoById.messages);
    }
  }, [data]);

  React.useEffect(() => {
    socket.emit("join_room", curRoom);
  }, []);



  React.useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on("receive_message", (data) => {
      if (data.sender != currentUserName) {
      setMessageList((list) => [...list, data]);
      }
    });
  }, [socket]);

  function sendMessage() {
    const data = { text: newMessage, sender: currentUserName};
    socket.emit("send_message", { ...data, room: conversationID });
    setMessageList((list) => [...list, data]
    );
    setNewMessage("");
    //change this to ref clear
  }


  function renderMessage({ item: message }) {
    //<View style={{  justifyContent: 'center', alignment: 'center' }}>
    // </View>
    console.log(message)

    const alignloc = currentUserName== message.sender ? "flex-end" : "flex-start";
    const flexDir = currentUserName== message.sender ? "row-reverse" : "row";
    //add padding

    return (
      <View style={{ justifyContent: "center", alignItems: alignloc }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: flexDir,
          }}
        >
          <Avatar.Text size={20} label="EVI" />
          <Text> {message.text}</Text>
        </View>
      </View>
    );
  }

            //justifyContent: "center",


 return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1.5, backgroundColor: "blue" }}>
          <Text>Chat Icons </Text>
        </View>
        <View style={{ flex: 8.5 }}>
          <View style={{ flex: 8.5 }}>
            <FlatList
              ItemSeparatorComponent={Divider}
              data={messageList}
              renderItem={renderMessage}
            />
          </View>
          <View style={{ flex: 1.5, justifyContent: "flex-end" }}>
            <TextInput
              label="Chat"
              value={newMessage}
              mode="outlined"
              outlineColor="green"
              multiline={true}
              onChangeText={(newMessage) => setNewMessage(newMessage)}
              right={
                <TextInput.Icon
                  name="send"
                  color={'blue'}
                  onPress={() => sendMessage()}
                />
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

