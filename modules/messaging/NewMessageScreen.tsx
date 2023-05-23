import React from "react";
import { useConstants } from "../../constants/ConstantsContext";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
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
import { SocketContext } from "../../socket/SocketContext";
import { useAuth } from "../../auth/AuthContext";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ALL_USERS, FIND_OR_CREATE_CONVO_BY_MEMBERS } from "./requests"; //temp use all convo
// make this modal

export function NewMessageScreen() {
  const linkTo = useLinkTo();
  const { currentAuthenticatedUser } = useAuth();
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  const [userList, setUserList] = React.useState([]);
  const [
    findOrCreateConvoByMembers,
    { data: dataAddConvo, loading: loadingAddConvo, error: errorAddConvo },
  ] = useMutation(FIND_OR_CREATE_CONVO_BY_MEMBERS);

  React.useEffect(() => {
    if (data) {
      setUserList(data.getAllUsers);
    }
  }, [data]);

  function renderUsers({ item: user }) {
    return (
      <>
        <Button
          mode="contained"
          onPress={() => handleChatUser(currentAuthenticatedUser, user.userID)}
        >
          <Text>{user.userID}</Text>
        </Button>
      </>
    );
  }
  async function handleChatUser(recepientID: string, senderID: string) {
    //should pass current user as context
    async function convertMembersIDtoConvoID(
      recepientID: string,
      senderID: string
    ) {
      const convo = await findOrCreateConvoByMembers({
        variables: { conversationMembers: [recepientID, senderID] },
      });
      const convoID = convo.data.findOrCreateConvoByMembers.conversationID;
      return convoID;
    }

    const convoID = await convertMembersIDtoConvoID(recepientID, senderID);
    linkTo(`/main/messages/conversation/${convoID}`);
  }

  return (
    <View>
      <FlatList
        ItemSeparatorComponent={Divider}
        data={userList}
        renderItem={renderUsers}
      />
    </View>
  );
}
