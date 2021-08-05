import firebase from 'firebase';
const firebaseConfig = {

    apiKey: "AIzaSyAPyspWJj-DclNn1K1K8jAWsiPiRXVhbUE",
  
    authDomain: "smart-classroom-fc67a.firebaseapp.com",
  
    projectId: "smart-classroom-fc67a",
  
    storageBucket: "smart-classroom-fc67a.appspot.com",
  
    messagingSenderId: "980795193526",
  
    appId: "1:980795193526:web:5729f368462d62686a4e17",
  
    measurementId: "G-TEW32TB1V6"
  
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth= firebase.auth();
  export {auth}

  export default db;