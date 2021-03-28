import {createSlice} from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
        player1: {},
        player2: {},
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    }
});


export const {fetchPokemons, fetchPokemonsReject, fetchPokemonsResolve} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());
    const data = await FirebaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;
