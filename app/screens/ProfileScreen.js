import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FIREBASE_AUTH} from '../FirebaseConfig';
// import {TaskContext} from '../context/TaskContextProvider';

export default function ProfileScreen() {
  const navigation = useNavigation();
//   const {todoDispatch} = useContext(TaskContext);
  return (
    <View style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
        <Button
          title="Logout"
          onPress={() => {
            FIREBASE_AUTH.signOut().then(
            //    todoDispatch({type: 'RESET'})
            ).catch(err => Alert.alert(err));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
