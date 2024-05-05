import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, {useState} from "react";

export default function () {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.textLabel}>EXPENSE TRACKER</Text>
      <TouchableOpacity
        onPress={() => {
          setIsFocus(!isFocus);
          console.log(isFocus)
        }}
      >
        <Icon
          style={styles.icon}
          color = "white"
          name = {isFocus ?  "settings": "settings-outline"}
          size={30}
          on
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 75,
    height: 75,
  },

  icon: {
    margin: 15,
  },

  textLabel: {
    color: "#ffffff",
  },
});
