import { Alert, Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { ExpenseContext } from "../context/ExpenseContextProvider";
// import {TaskContext} from '../context/TaskContextProvider';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {expenseDispatch} = useContext(ExpenseContext)
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textLabel}>ProfileScreen</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            FIREBASE_AUTH.signOut().then(res => {
              // expenseDispatch({type: 'RESET'})
            }).catch(err => {
              console.log(err)
            })
          }}
        >
          <Text style={styles.textLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
  },

  textLabel: {
    color: "#ffffff",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#3d3d3d",
    color: "#ffffff",
    padding: 20,
    borderRadius: 20
  },
});
