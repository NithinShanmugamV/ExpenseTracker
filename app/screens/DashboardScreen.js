import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseContext } from "../context/ExpenseContextProvider";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { UserContext } from "../context/UserContextProvider";
import CreateExpense from "../components/CreateExpense";

export default function DashboardScreen() {
  const { expense, setUserData, expenseDispatch, userData } = useContext(ExpenseContext);
  const { user } = useContext(UserContext);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [categorizedMonthlyExpense, setCategorizedMonthlyExpense] = useState();
  const [month, setMonth] = useState(currentYear + "-" + currentMonth);

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 12 ? prevYear + 1 : prevYear
    );
    // loadExpense()
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 1 ? prevYear - 1 : prevYear
    );
    // loadExpense()
  };

  console.log(expense);
  const categorizeMonthlyExpensesFunc = (monthlyExpense) => {
    const categorizedMonthlyExpenses = {};
    if (monthlyExpense == undefined) return null;
    monthlyExpense.forEach((expense) => {
      const { category } = expense;
      if (!categorizedMonthlyExpenses[category]) {
        categorizedMonthlyExpenses[category] = [];
      }
      categorizedMonthlyExpenses[category].push(expense);
    });

    return categorizedMonthlyExpenses;
  };

  useEffect(() => {
    console.log(currentYear + "-" + currentMonth);
    console.log("expense: ", expense[currentYear + "-" + currentMonth]);
    setCategorizedMonthlyExpense(
      categorizeMonthlyExpensesFunc(expense[currentYear + "-" + currentMonth])
    );
    setMonth(currentYear + "-" + currentMonth)
  }, [expense, currentMonth, currentYear]);

  const loadExpense = async () => {
    try {
      if (user) {
        const url = `https://jsonserver-eyex.onrender.com/data?email?=${user.email}`;
        fetch(url)
          .then((res) => {
            console.log("Network request made");
            return res.json();
          })
          .then((data) => {
            console.log("from url: ", data[0].expense);
            setUserData(data[0]);
            console.log("userData: ", userData)
            expenseDispatch({
              type: "FETCH_EXPENSE",
              payload: data[0].expense,
            });
          })
          .catch((err) => {
            // Alert.alert(err.message);
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(month)
    loadExpense();
  }, [user, month]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.month}>
          <Button onPress={handlePreviousMonth}>
            <MaterialIcons name="keyboard-arrow-left" size={20} color="green" />
          </Button>
          <Text
            style={styles.textLabel}
          >{`${currentMonth}/${currentYear}`}</Text>
          <Button onPress={handleNextMonth}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color="green"
            />
          </Button>
        </View>
        <Text style={styles.textLabel}></Text>
        <ScrollView>
          {categorizedMonthlyExpense ? (
            Object.keys(categorizedMonthlyExpense).map((category) => (
              <View key={category} style={styles.box}>
                <Text style={styles.textLabel}>{category}</Text>
                {categorizedMonthlyExpense[category].map((expense) => (
                  <ListItem key={expense.id} item={expense} >{console.log("id: ", expense.id)}</ListItem>
                ))}
              </View>
            ))
          ) : (
            <Text style={styles.textLabel}>No expense added yet</Text>
          )}
        </ScrollView>
      </View>
      <CreateExpense style={styles.dashboardButton} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Align children with space between
    backgroundColor: "#0d0d0d",
  },
  content: {
    flex: 4,
    padding: 20,
  },

  box: {
    backgroundColor: "#3d3d3d",
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },

  month: {
    flexDirection: "row",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },

  textLabel: {
    color: "#ffffff",
  },

  dashboardButton: {
    backgroundColor: "blue",
  },
});
/*
return <ListItem key={item.id} item={item} />;
*/
