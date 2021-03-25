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

class Firebase {
    constructor() {
        this.fire = firebase;
        this.database = this.fire.database();
    }

    getPokemonSocket = (callback) => {
        this.database.ref('pokemons').on('value', (snapshot) => {
            callback(snapshot.val());
        })
    }

    offPokemonSocket = () => {
        this.database.ref('pokemons').off()
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }

    getOnePokemon = async (id) => {
        return await this.database.ref('pokemons')
            .orderByChild('id').equalTo(id)
            .once('value').then(snapshot => snapshot.val());
    }

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon);
    }

    updatePokemon = (key, update, callback) => {
        this.database.ref(`pokemons/${key}`).update(update).then(callback);
    }

    addPokemon = (data, callback) => {
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref('pokemons/' + newKey).set(data).then(callback);
    }
}

export default Firebase;