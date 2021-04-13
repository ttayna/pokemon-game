import {configureStore} from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons";
import boardReducer from "./board";
import userReducer from "./user";

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        board: boardReducer,
        user: userReducer,
    }
});
