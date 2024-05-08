import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { ExpenseContext } from "../context/ExpenseContextProvider";
import ViewExpense from "./ViewExpense";

const categoryIcons = {
  bills: { icon: "text-document-inverted", family: "Entypo" }, //problem
  vehicle: { icon: "car", family: "AntDesign" },
  shopping: { icon: "shoppingcart", family: "AntDesign" }, //problem
  education: { icon: "book-education", family: "MaterialCommunityIcons" },
  food: { icon: "food", family: "MaterialCommunityIcons" },
  health: { icon: "health-and-safety", family: "MaterialIcons" },
  home: { icon: "home", family: "AntDesign" },
  telephone: { icon: "telephone", family: "Foundation" },
  others: { icon: "dots-three-horizontal", family: "Entypo" },
};

export default function ListItem({ item }) {
  const { category, name, amount, date } = item;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const { expenseDispatch } = useContext(ExpenseContext);

  const iconDetails = categoryIcons[category] || categoryIcons.others;

  return (
    <TouchableOpacity style={styles.item}>
      {iconDetails.family === "AntDesign" && (
        <AntDesign name={iconDetails.icon} color="#40A2D8" size={30} />
      )}
      {iconDetails.family === "MaterialCommunityIcons" && (
        <MaterialCommunityIcons
          name={iconDetails.icon}
          color="#40A2D8"
          size={30}
        />
      )}
      {iconDetails.family === "MaterialIcons" && (
        <MaterialIcons name={iconDetails.icon} color="#40A2D8" size={30} />
      )}
      {iconDetails.family === "Foundation" && (
        <Foundation name={iconDetails.icon} color="#40A2D8" size={30} />
      )}
      {iconDetails.family === "Entypo" && (
        <Entypo name={iconDetails.icon} color="#40A2D8" size={30} />
      )}

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.textLabel}>{name}</Text>
        <Text style={styles.textLabel}>{amount}</Text>
      </TouchableOpacity>

      <MaterialCommunityIcons
        name="delete"
        color="red"
        size={30}
        onPress={() => {
          Alert.alert(
            "Delete task",
            "Are you certain about deleting this task?",
            [
              {
                text: "Yes",
                onPress: () => {
                  console.log(date, item.date);
                  const dateObject = new Date(date);
                  const outputString = `${dateObject.getFullYear()}-${
                    dateObject.getMonth() + 1
                  }`;
                  expenseDispatch({
                    type: "REMOVE_EXPENSE",
                    payload: {
                      id: item.id,
                      monthYr: outputString,
                    },
                  });
                },
              },
              {
                text: "No",
                onPress: () => console.log("No"),
              },
            ]
          );
        }}
      />

      <ViewExpense
        visible={modalVisible}
        expenseData={item}
        onCloseModal={() => {
          setModalVisible(false);
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
