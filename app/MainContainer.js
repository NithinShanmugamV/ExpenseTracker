import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignupScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import {onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from './FirebaseConfig';
import {UserContext} from './context/UserContextProvider';
import ProfileScreen from './screens/ProfileScreen';
import DashboardScreen from './screens/DashboardScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import { Dimensions, StyleSheet } from 'react-native';
// import User from 'firebase/auth'

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
const screenWidth = Dimensions.get('window').width;

const Profile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default function MainContainer() {
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      setUser(user);
    });
  }, [user]);
  return (
    <NavigationContainer style = {styles.container} >
      <Tab.Navigator
        initialRouteName="Expense"
        barStyle = {styles.bottomBarColor}
        activeColor="#ffffff"
        inactiveColor="#e0e0e0" 
        screenOptions={({route}) => ({
          tabBarIcon({focused, color}) {
            let iconName;
            let rn = route.name;

            if (rn === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
            else if (rn === 'Expense')
              iconName = focused ? 'view-list' : 'view-list-outline';
            else if (rn === 'Profile')
              iconName = focused ? 'account' : 'account-outline';
            else if (rn === 'Auth')
              iconName = focused ? 'account' : 'account-outline';

            return (
              <MaterialCommunityIcons name={iconName} size={30} color={color} />
            );
          },
        })}>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Expense" component={ExpenseScreen} />
        {user ? (
          <Tab.Screen name="Profile" component={ProfileScreen} />
        ) : (
          <Tab.Screen name="Auth" component={Profile} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: screenWidth, 
  },

  bottomBarColor: {
    backgroundColor: '#0d0d0d',
    color: "white",
    borderTopColor: "red",
    borderLeftColor: "red",
    borderRightColor: "red",
    borderTopWidth: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    position: 'absolute',
    overflow: 'hidden',
    alignItems: "flex-start"
  },

})