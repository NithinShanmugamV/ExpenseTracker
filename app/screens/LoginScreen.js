import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const auth = FIREBASE_AUTH;
export default function () {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, pw);
      Alert.alert("Login Success");
    } catch (err) {
      // Check error codes and handle different cases
      const msg = err.message.match(/\/([^/]+)\)/);
      msg ? Alert.alert(msg[1]) : Alert.alert("Error occured");
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Enter email address"
        placeholderTextColor="white"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={pw}
        secureTextEntry={true}
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="white"
        autoCapitalize="none"
        onChangeText={(text) => setPw(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.textLabel}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToSignup}>
            <Text style={styles.textLabel}>Create an account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d0d0d",
  },

  input: {
    marginVertical: 4,
    height: 50,
    width: "60%",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    color: "white",
    backgroundColor: "#3d3d3d",
    borderRadius: 15,
    borderColor: "white",
  },

  textLabel: {
    color: "#ffffff",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#3d3d3d",
    color: "#ffffff",
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
