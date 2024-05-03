import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function () {
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require('../assets/expenseIcon.png')} />
      <Text style={styles.textLabel}>Expense Tracker</Text>
      <Image style={styles.profile} source={require('../assets/profile.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  logo: {
    width: 50,
    height: 50,
  },

  profile: {
    width: 50,
    height: 50,
  },

  textLabel : {
    color: "#ffffff"
  },

});
