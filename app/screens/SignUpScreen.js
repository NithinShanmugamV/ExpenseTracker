import {Button, StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {FIREBASE_AUTH} from '../FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const auth = FIREBASE_AUTH;
export default function () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const SignUp = async () => {
    setLoading(true);
    try {
      if (confirmPw !== pw) Alert.alert("Password didn't match");
      else if (pw.length < 8)
        Alert.alert('Password length should be atleast 8');
      else if (name.length === 0) Alert.alert('Please enter name');
      else {
        createUserWithEmailAndPassword(auth, email, pw)
          .then(res => {
            const userData = {
              name: name,
              email: email,
              dob: "",
              expense: {}
            };

            const url = 'https://jsonserver-eyex.onrender.com/data';

            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            };

            fetch(url, requestOptions)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to add user');
                }
                return response.json(); // Assuming the server returns the added user data
              })
              .then(data => console.log('User added successfully:', data))
              .catch(err => {
                const msg = err.message.match(/\/([^/]+)\)/);
                msg ? Alert.alert(msg[1]) : Alert.alert('Error occured');
              });
          })
          .catch(err => {
            const msg = err.message.match(/\/([^/]+)\)/);
            msg ? Alert.alert(msg[1]) : Alert.alert('Error occured');
          });
      }

      console.log(response);
    } catch (err) {
      const msg = err.message.match(/\/([^/]+)\)/);
      msg ? Alert.alert(msg[1]) : Alert.alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="white"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="white"
        autoCapitalize="none"
        onChangeText={text => setName(text)}
      />
      <TextInput
        value={pw}
        secureTextEntry={true}
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="white"
        autoCapitalize="none"
        onChangeText={text => setPw(text)}
      />
      <TextInput
        value={confirmPw}
        secureTextEntry={true}
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="white"
        autoCapitalize="none"
        onChangeText={text => setConfirmPw(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Button title="SignUp" onPress={SignUp} />
          <Button title="Go to login" onPress={goToLogin} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d0d0d',
  },

  input: {
    marginVertical: 4,
    height: 50,
    width: '60%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    color: 'white',
    backgroundColor: '#3d3d3d',
    borderRadius: 15,
    borderColor: 'white',
  },
});
