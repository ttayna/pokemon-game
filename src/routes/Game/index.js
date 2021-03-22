import {useState} from 'react';
import {useRouteMatch, Route, Switch} from 'react-router-dom';
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../context/pokemonContext";

const GamePage = () => {
    const match = useRouteMatch();
    const [pokemons, setPokemons] = useState([]);

    const handlerSetPokemons = (selectedPokemons) => {
        setPokemons(selectedPokemons);
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: pokemons,
            onSetPokemons: handlerSetPokemons
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