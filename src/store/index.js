import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counter";
import pokemonsReducer from "./pokemons";
import boardReducer from "./board";

export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer,
        board: boardReducer,
    }
});
