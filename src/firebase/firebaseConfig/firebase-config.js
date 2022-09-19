import * as firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPCraVeHHWRjhxxVuLuwnd12Lef_kjo_Y",
    authDomain: "grocerywalaapp-6674c.firebaseapp.com",
    projectId: "grocerywalaapp-6674c",
    storageBucket: "grocerywalaapp-6674c.appspot.com",
    messagingSenderId: "597473505066",
    appId: "1:597473505066:web:a5ea21728f6c9fbdcab853",
    measurementId: "G-MVZCGKBZGV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
export { db };
