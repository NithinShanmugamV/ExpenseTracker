import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ListItem({ item }) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text>
        <Feather name="check-circle" color="green" size={30} />
      </Text>
      <View>
        <Text style={styles.textLabel}>{item.name}</Text>
        <Text style={styles.textLabel}>{item.amount}</Text>
      </View>

      <MaterialIcons
        name="cancel"
        color="red"
        size={30}
        onPress={() => {
          Alert.alert(
            "Delete task",
            "Are you certain about deleting this task?",
            [
              {
                text: "Yes",
                onPress: () => console.log("Yes"),
              },
              {
                text: "No",
                onPress: () => console.log("No"),
              },
            ]
          );
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  textLabel: {
    color: "#ffffff",
  },
});
