import {createSlice} from "@reduxjs/toolkit";
import {selectLocalId} from "./user";

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

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectLocalId(getState());
    dispatch(fetchPokemons());
    const data = await fetch(`https://pokemon-game-7885f-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json());
    dispatch(fetchPokemonsResolve(data));
}

export const savePokemonsAsync = (newPokemon) => async (dispatch, getState) => {
    const localId = selectLocalId(getState());
    const idToken = localStorage.getItem('idToken');
    const pokemons = pokemonsData(getState());
    const uniqPokemon = Object.entries(pokemons).filter(item => item.id === newPokemon.id);

    if (uniqPokemon.length) {
        return;
    }

    await fetch(`https://pokemon-game-7885f-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`, {
        method: 'POST',
        body: JSON.stringify(newPokemon)
    });

    getPokemonsAsync();
}

export default slice.reducer;
