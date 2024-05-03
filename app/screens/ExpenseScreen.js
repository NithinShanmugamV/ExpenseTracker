import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExpenseContext } from "../context/ExpenseContextProvider";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

  let highestSpentMonth = "";
  let highestMonthlySpending = 0;
  Object.entries(expense).forEach(([month, monthlyExpenses]) => {
    const totalMonthlyExpenses = monthlyExpenses.reduce((total, expenseItem) => total + expenseItem.amount, 0);
    if (totalMonthlyExpenses > highestMonthlySpending) {
      highestMonthlySpending = totalMonthlyExpenses;
      highestSpentMonth = month;
      const month1 = parseInt(month.split('-')[1], 10) - 1; // Subtract 1 to get the correct index
      highestSpentMonth = monthNames[month1];
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
        <Text style={[styles.textLabel, styles.title]}>Expense Insights</Text>
        <View style={styles.modalEle}>
          <View style={[styles.insideEle]}>
            <Text style={[styles.textLabel]}>
              Total Expenses: Rs.{totalExpenses}
            </Text>
          </View>

          <View style={[styles.insideEle]}>
            <Text style={[styles.textLabel]}>
              Highest Spent Category: {highestSpentCategory}
            </Text>
          </View>
        </View>

        <View style={styles.modalEle}>
          <View style={[styles.insideEle]}>
            <Text style={[styles.textLabel]}>
            Highest Spent Amount: Rs.{highestSpentAmount}
            </Text>
          </View>

          <View style={[styles.insideEle]}>
            <Text style={[styles.textLabel]}>
              Highest Spent Month: {highestSpentMonth}
            </Text>
          </View>
        </View>

        {/* Add more insights as needed */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  textLabel: {
    color: "#ffffff",
  },

  modalEle: {
    flexDirection: "row",
    padding: 10,
    height: "35%",
    margin: 5,
  },
  insideEle: {
    flex: 1,
    padding: 20,
    flexWrap: 'wrap',
    backgroundColor: "#3d3d3d",
    margin: 8,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
