import {createSlice} from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
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


export const {
    fetchPokemons,
    fetchPokemonsResolve,
} = slice.actions;

export const pokemonsLoading = state => state.pokemons.isLoading;
export const pokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());
    const data = await FirebaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;
