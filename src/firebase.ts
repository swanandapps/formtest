import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBLAmZDlu7QuyhfYkjpM8WjRWOy0ljdk6I",
  authDomain: "form-7eb61.firebaseapp.com",
  databaseURL: "https://form-7eb61.firebaseio.com",
  projectId: "form-7eb61",
  storageBucket: "form-7eb61.appspot.com",
  messagingSenderId: "888950431152",
  appId: "1:888950431152:web:38fdcf1b7431a0cf454a75"
});

const db = firebaseApp.firestore();

// Export the database for components to use.
export { db };
