import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'board',
    initialState: {
        player1Data: [],
        player2Data: [],
        currentPlayer: 0,
        gameResult: null,
    },
    reducers: {
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
        clearState: state => ({
            ...state,
            isLoading: false,
            data: {},
            error: null,
            player1Data: {},
            player2Data: {},
            currentPlayer: 0,
            gameResult: null,
        })
    }
});

export const {
    setPlayer1Pokemons,
    fetchOpponentPokemons,
    fetchOpponentPokemonsResolve,
    setCurrentPlayer,
    setGameResult,
    clearState,
} = slice.actions;

export const pokemonsPlayer1Data = state => state.board.player1Data;
export const pokemonsPlayer2Data = state => state.board.player2Data;
export const currentPlayer = state => state.board.currentPlayer;
export const gameResult = state => state.board.gameResult;

export const getOpponentPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchOpponentPokemons());
    const player2Request = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
    const player2Response = await player2Request.json();
    dispatch(fetchOpponentPokemonsResolve(player2Response.data));
}

export default slice.reducer;
