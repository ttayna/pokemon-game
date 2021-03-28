import {createSlice} from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
        player1Data: {},
        player2Data: {},
        currentPlayer: 0,
        gameResult: null,
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
        setPlayer1Pokemons: (state, action) => ({
            ...state,
            player1Data: action.payload,
        }),
        fetchOpponentPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchOpponentPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            player2Data: action.payload,
        }),
        setCurrentPlayer: (state, action) => ({
            ...state,
            currentPlayer: action.payload,
        }),
        setGameResult: (state, action) => ({
            ...state,
            gameResult: action.payload,
        }),
    }
});


export const {
    fetchPokemons,
    fetchPokemonsResolve,
    setPlayer1Pokemons,
    fetchOpponentPokemons,
    fetchOpponentPokemonsResolve,
    setCurrentPlayer,
    setGameResult,
} = slice.actions;

export const pokemonsLoading = state => state.pokemons.isLoading;
export const pokemonsData = state => state.pokemons.data;
export const pokemonsPlayer1Data = state => state.pokemons.player1Data;
export const pokemonsPlayer2Data = state => state.pokemons.player2Data;
export const currentPlayer = state => state.pokemons.currentPlayer;
export const gameResult = state => state.pokemons.gameResult;

export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());
    const data = await FirebaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data));
}

export const getOpponentPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchOpponentPokemons());
    const player2Request = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
    const player2Response = await player2Request.json();
    dispatch(fetchOpponentPokemonsResolve(player2Response.data));
}

export default slice.reducer;
