import { View } from "react-native";
import { Text } from "react-native-paper";
import { useConstants } from "../../constants/ConstantsContext";

export function MessagingScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Messages</Text>
    </View>
  );
}
