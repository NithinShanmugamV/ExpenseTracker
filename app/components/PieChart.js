import React, { useContext } from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ExpenseContext } from '../context/ExpenseContextProvider';

const PieChart = () => {
  // Extracting expense categories and amounts from expenseData
  const {expense} = useContext(ExpenseContext)
  const data = expense.map((monthExpenses) =>
    Object.values(monthExpenses).flat().reduce((acc, expense) => {
      const category = expense.category;
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {})
  );

  // Converting data to the format required by PieChart component
  const pieChartData = data.map((monthData) =>
    Object.entries(monthData).map(([category, amount], index) => ({
      name: category,
      amount,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }))
  );

  return (
    <View>
      {pieChartData.map((monthChartData, index) => (
        <PieChart
          key={index}
          data={monthChartData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            decimalPlaces: 0, // no decimal places
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ))}
    </View>
  );
};

export default ExpensePieChart;
