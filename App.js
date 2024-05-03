import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   useEffect(() => {
//     const loadExpense = async () => {
//       try {
//         const url = `https://jsonserver-eyex.onrender.com/data`;
//         console.log(url)
//         fetch(url)
//           .then(res => {
//             console.log('Network request made');
//             return res.json();
//           })
//           .then(data => {
//             console.log(data);
//             // setUserData(data[0])
//             // setExpense()
//           })
//           .catch(err => {
//             // Alert.alert(err.message);
//             console.log(err);
//           });
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     loadExpense();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import UserContextProvider from './app/context/UserContextProvider';
import ExpenseTrackerContextProvider from './app/context/ExpenseContextProvider';
import MainContainer from './app/MainContainer';
import 'react-native-gesture-handler';

export default function App(){

  return (
    <UserContextProvider>
      <ExpenseTrackerContextProvider>
        <MainContainer />
      </ExpenseTrackerContextProvider>
    </UserContextProvider>
  );
}