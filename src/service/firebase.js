import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBAXEsKkPASf_-fFUZ86voycfhkShVbSO8",
    authDomain: "pokemon-game-7885f.firebaseapp.com",
    databaseURL: "https://pokemon-game-7885f-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-7885f",
    storageBucket: "pokemon-game-7885f.appspot.com",
    messagingSenderId: "438147393735",
    appId: "1:438147393735:web:31851e191ef4b0d67cf6e2"
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;