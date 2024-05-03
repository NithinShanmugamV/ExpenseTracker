// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth, initializeAuth, getRe } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxrSEoQGUV3PEtR0Z2Cc4mIJzIQQ-pg3s",
  authDomain: "authentication-4005a.firebaseapp.com",
  projectId: "authentication-4005a",
  storageBucket: "authentication-4005a.appspot.com",
  messagingSenderId: "154175599268",
  appId: "1:154175599268:web:b8fdcbfa51c5c16c11ec31",
  measurementId: "G-XDF5LRR835"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
