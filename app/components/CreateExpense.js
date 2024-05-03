import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import DatePicker from "react-native-date-picker";
import { RadioButton } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { ExpenseContext } from "../context/ExpenseContextProvider";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateExpense() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusMop, setIsFocusMop] = useState(false);
  const [month, setMonth] = useState(null);

  const [modalData, setModalData] = useState({
    name: "",
    date: new Date(),
    category: "",
    mop: "",
    income: "income",
    amount: 0,
  });

  const { expenseDispatch, userData, expense } = useContext(ExpenseContext);
  const categoryData = [
    { label: "Food", value: "food" },
    { label: "Transportation", value: "vehicle" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Recharges", value: "recharges" },
    { label: "Education", value: "education" },
    { label: "Health", value: "health" },
    { label: "Home", value: "home" },
    { label: "Telephone", value: "telephone" },
    { label: "Others", value: "others" },
  ];
  

  const mopData = [
    { label: "Cash", value: "Cash" },
    { label: "Netbanking", value: "netbanking" },
    { label: "UPI", value: "UPI" },
    { label: "Card", value: "Card" },
  ];

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false)
    // setShowDatePicker(Platform.OS === "ios");
    setDate(selectedDate);
    const dateObject = new Date(selectedDate); // Convert the date string to a Date object
    const outputString = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}`;
    setModalData({...modalData, date: selectedDate});
    setMonth(outputString)
    
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  saveTodos = async () => {
    const url = `https://jsonserver-eyex.onrender.com/data/${userData.id}}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData, expense: expense }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("PUT request successful:", data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create new Expense</Text>
            <View style={styles.modalEle}>
              <Text style={styles.textLabel}>Name: </Text>
              <TextInput
                multiline
                textStyle={styles.textLabel}
                placeholder="new expense..."
                placeholderTextColor="white"
                onChangeText={(val) =>
                  setModalData({ ...modalData, name: val })
                }
                styles={[
                  styles.input,
                  { color: modalData.name ? "white" : "black" },
                ]}
              />
            </View>

            {/* Date picker */}

            <View style={styles.modalEle}>
              <Text style={styles.textLabel}>Date: </Text>
              {/* <Button title="Select date" onPress={() => setOpen(true)} /> */}
              {/* <DatePicker
                modal
                open={open}
                date={modalData.date}
                onConfirm={date => {
                  setOpen(false);
                  const dateObject = new Date(date); // Convert the date string to a Date object
                  const outputString = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}`;
                  console.log(outputString)
                  setModalData({...modalData, date: date});
                  setMonth(outputString)
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              /> */}
              <Button onPress={showDatepicker} title="Show date picker" />
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                  onCl
                />
              )}
            </View>

            <View style={styles.dropdownStyle}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={categoryData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select category" : "..."}
                value={modalData.category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setModalData({ ...modalData, category: item.value });
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>

            <View style={styles.dropdownStyle}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={mopData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Mode of payment" : "..."}
                placeholderTextColor="white"
                value={modalData.mop}
                onFocus={() => setIsFocusMop(true)}
                onBlur={() => setIsFocusMop(false)}
                onChange={(item) => {
                  setModalData({ ...modalData, mop: item.value });
                  setIsFocusMop(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocusMop ? "blue" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>

            {/* Radio button for my day */}
            <View style={styles.modalEle}>
              <View style={styles.modalEle}>
                <Text style={styles.textLabel}>Income</Text>
                <View style={styles.radioButton}>
                  <RadioButton
                    value="true"
                    status={
                      modalData.income == "income" ? "checked" : "unchecked"
                    }
                    onPress={() =>
                      setModalData({ ...modalData, income: "income" })
                    }
                  />
                </View>
              </View>

              <View style={styles.modalEle}>
                <Text style={styles.textLabel}>Expense</Text>
                <View style={styles.radioButton}>
                  <RadioButton
                    value="true"
                    status={
                      modalData.income == "expense" ? "checked" : "unchecked"
                    }
                    onPress={() =>
                      setModalData({ ...modalData, income: "expense" })
                    }
                  />
                </View>
              </View>
            </View>

            <View style={styles.modalEle}>
              <Text style={styles.textLabel}>Amount: </Text>
              <TextInput
                multiline
                placeholder="enter amount..."
                placeholderTextColor="white"
                onChangeText={(val) =>
                  setModalData({ ...modalData, amount: Number(val) })
                }
                styles={styles.input}
              />
            </View>

            <View style={styles.modalEle}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  // todoDispatch({type: 'ADD_TODO', payload: modalData});
                  expenseDispatch({
                    type: "ADD_EXPENSE",
                    payload: {
                      month: month,
                      expense: modalData,
                    },
                  });
                  // saveTodos()
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Exit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen, styles.buttonAdd]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>
          <Entypo name="add-to-list" size={20} />
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%", // Adjust width as needed
    backgroundColor: "#3d3d3d",
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%", // Adjust width as needed
    backgroundColor: "red",
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonEle: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
  textLabel: {
    // marginLeft: 1,
    fontSize: 16,
    color: "white",
  },
  description: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    margin: 3,
    marginBottom: 20,
    width: "100%", // Adjust width as needed
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    margin: 5,
  },
  buttonAdd: {
    position: "absolute",
    bottom: "70%",
    right: "10%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalEle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "3%",
    color: "white",
  },

  dropdownStyle: {
    margin: "3%",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: "white",
  },
  label: {
    position: "absolute",
    backgroundColor: "#0d0d0d",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: "white",
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
//java -jar bundletool.jar build-apks --bundle=filename.aab --output=newfilename.apks --mode=universal