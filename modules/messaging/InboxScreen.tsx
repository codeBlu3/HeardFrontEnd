import React from "react";
import { useConstants } from "../../constants/ConstantsContext";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import { useLinkTo, Link, useNavigation } from "@react-navigation/native";
import {
  Text,
  Button,
  Divider,
  TextInput,
  Avatar,
  useTheme,
} from "react-native-paper";
import { io } from "socket.io-client";
import { SocketContext } from "../../socket/SocketContext";
import { useAuth } from "../../auth/AuthContext";
import { useQuery } from "@apollo/client";

import { GET_ALL_CONVO, GET_ALL_USERS } from "./requests"; //temp use all convo

export function InboxScreen() {
  const { data, loading, error } = useQuery(GET_ALL_CONVO);
  const [convoList, setConvoList] = React.useState([]);

  const linkTo = useLinkTo();
  //const navigation = useNavigation();

  React.useEffect(() => {
    if (data) {
      setConvoList(data.getAllConvo);
    }
  }, [data]);

  function renderConversations({ item: convo }) {
    return (
      <Button
        mode="contained"
        onPress={() =>
          linkTo(`/main/messages/conversation/${convo.conversationID}`)
        }
      >
        <Text>{convo.conversationID}</Text>
      </Button>
    );
  }

  return (
    <View>
      <Button
        mode="contained"
        onPress={() => linkTo("/main/messages/newmessage")}
      >
        <Text> New Message</Text>
      </Button>
      <Divider />
      <ScrollView>
        <FlatList
          ItemSeparatorComponent={Divider}
          data={convoList}
          renderItem={renderConversations}
        />
      </ScrollView>
    </View>
  );
}

/*
           <FlatList
              ItemSeparatorComponent={Divider}
              data={userList}
              renderItem={renderUsers}
            />
 

*/
