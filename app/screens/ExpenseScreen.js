import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExpenseContext } from "../context/ExpenseContextProvider";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpenseScreen() {
  const { expense } = useContext(ExpenseContext);
  // Calculate total expenses
  const totalExpenses = Object.values(expense).reduce((total, expense) => {
    return (
      total + expense.reduce((subTotal, item) => subTotal + item.amount, 0)
    );
  }, 0);

  // Find the category with the highest spending
  let highestSpentCategory = "";
  let highestSpentAmount = 0;
  Object.values(expense).forEach((monthlyExpenses) => {
    monthlyExpenses.forEach((expense) => {
      if (expense.amount > highestSpentAmount) {
        highestSpentAmount = expense.amount;
        highestSpentCategory = expense.category;
      }
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Header />
        <Text style={[styles.textLabel, styles.title]}>Expense Insights</Text>
        <Text style={styles.textLabel}>Total Expenses: ${totalExpenses}</Text>
        <Text style={styles.textLabel}>
          Highest Spent Category: {highestSpentCategory}
        </Text>
        <Text style={styles.textLabel}>
          Highest Spent Amount: ${highestSpentAmount}
        </Text>
        {/* Add more insights as needed */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ffffff',
    // padding: 20,
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    flex: 1,
    // justifyContent: "space-between", // Align children with space between
    backgroundColor: "#0d0d0d",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  textLabel: {
    color: "#ffffff",
  },
});
