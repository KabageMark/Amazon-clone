import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyBdpr8hYfLi3aya3P63nExSQ3CZuxGtvQo",
    authDomain: "clone-b6543.firebaseapp.com",
    databaseURL: "https://clone-b6543.firebaseio.com",
    projectId: "clone-b6543",
    storageBucket: "clone-b6543.appspot.com",
    messagingSenderId: "115126293519",
    appId: "1:115126293519:web:a894364b96c24518087f7a"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };