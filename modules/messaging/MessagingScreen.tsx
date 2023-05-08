import { useConstants } from "../../constants/ConstantsContext";

export function MessagingScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Messages</Text>
    </View>
  );
}
/*
import React from "react";
import { FlatList, StyleSheet, View,  ScrollView } from "react-native";
import { useLinkTo, Link } from "@react-navigation/native";
import {
Text, 
  Button,
  Divider,
  TextInput,
  Avatar,
  useTheme,
} from "react-native-paper";
import { io } from "socket.io-client";
import { SocketContext} from "../../socket/SocketContext";

import { useQuery } from "@apollo/client";
//import {GET_USERNAME_BY_ID } from '../graphql/requests', get username by userID
import { GET_CONVO_BY_ID } from "./requests";

export default function MessagesScreen({ route, navigation }) {
  const { conversationID } = route.params;
  //console.log(conversationID)
  const { data, loading, error } = useQuery(GET_CONVO_BY_ID, {
    variables: { conversationID },
  });
  //console.log(data)

  const { colors } = useTheme();
  const socket = React.useContext(SocketContext);

  const [newMessage, setNewMessage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [userID, setuserID] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [curRoom, setCurRoom] = React.useState(conversationID); //this should be conversation ID  //hmmm check backend code  state resolution should be on the socket io level, updating the mongo db

  // add identity icons

  // pwede to get user token
  React.useEffect(() => {
    const getUserID = async () => {
      let resp = await fetch("http://localhost:4000/user", {
        credentials: "include",
      });
      console.log(resp);
      let result = await resp.json();
      let userID = await result.userID;
      setUsername(userID); //this should be top level
    };
    getUserID();
  }, []);

  React.useEffect(() => {
    socket.emit("join_room", curRoom);
  }, []);

  React.useEffect(() => {
    if (data) {
      setMessageList(data.getConvoById.messages);
    }
  }, [data]);

  React.useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on("receive_message", (data) => {
      //console.log('rec')
      //console.log(data)
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  //socket.emit("join_room", curRoom);

  function sendMessage() {
    const data = { text: newMessage, sender: username };
    socket.emit("send_message", { ...data, room: conversationID });
    setMessageList((list) => [...list, data]);
    setNewMessage("");
    //change this to ref clear
  }

  function renderMessage({ item: message }) {
    //<View style={{  justifyContent: 'center', alignment: 'center' }}>
    // </View>

    const alignloc = username == message.sender ? "flex-end" : "flex-start";
    const flexDir = username == message.sender ? "row-reverse" : "row";
    //add padding

    return (
      <View style={{ justifyContent: "center", alignItems: alignloc }}>
        <View
          style={{
            justifyConent: "center",
            alignItems: "center",
            flexDirection: flexDir,
          }}
        >
          <Avatar.Text size={20} color={colors.accent} label="EVI" />
          <Title> {message.text}</Title>
        </View>
      </View>
    );
  }

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
                  color={colors.accent}
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

*/
// justifyContent: 'flex-end'
//style={{ flexDirection: 'column' }}
/*
   <TextInput
	       label="Type new Message"
               value={message}
	       onChangeText={message=> setMessage(message)}
	     />

//  const socket = io("http://localhost:5000",{ autoConnect: false } , {withCredentials: true,})
 //const socket = useRef();


*/
