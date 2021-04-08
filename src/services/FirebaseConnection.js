import firebase from 'firebase/app';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDgLKg79c_7sMod1WCXmZkqYBHwIx0IV0Q",
    authDomain: "chamados-28427.firebaseapp.com",
    projectId: "chamados-28427",
    storageBucket: "chamados-28427.appspot.com",
    messagingSenderId: "706204890904",
    appId: "1:706204890904:web:e1f61fbcfbd75d246d906d",
    measurementId: "G-19H6K2F7JS"
};

if (firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
