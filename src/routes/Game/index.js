import {useState} from 'react';
import {useRouteMatch, Route, Switch} from 'react-router-dom';
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../context/pokemonContext";

const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemons, setSelectedPokemons] = useState([]);

    const handlerSetPokemon = (pokemonKey, selectedPokemon) => {

        setSelectedPokemons(prevState => {
            if (prevState[pokemonKey]) {
                const copyState = {...prevState};
                delete copyState[pokemonKey];

                return copyState;
            }

            return {
                ...prevState,
                [pokemonKey]: selectedPokemon
            }
        })
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSetPokemon: handlerSetPokemon
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;