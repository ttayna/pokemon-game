import {useState, useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {FireBaseContext} from "../../../../context/firebaseContext";
import {PokemonContext} from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css';

const StartGame = () => {
    const history = useHistory();
    const firebase = useContext(FireBaseContext);
    const [pokemons, setPokemons] = useState({});
    const pokemonContext = useContext(PokemonContext);

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setPokemons(pokemons);
        });
    },[firebase]);

    const selectPokemon = (pokemonKey) => {
        setPokemons(prevState =>
            Object.entries(prevState).reduce((acc, [key, item]) => {
                const pokemon = {...item};

                acc[key] = key === pokemonKey ? {...pokemon, selected: !item.selected} : pokemon;

                return acc;
            }, {})
        );
    }

    const handleSetPokemons = () => {
        const selectedPokemons = [];
        Object.entries(pokemons).forEach(([key, item]) => {
            if (!!item.selected) {
                selectedPokemons[key] = item;
            }
        });

        if (!Object.keys(selectedPokemons).length) {
            return;
        }

        pokemonContext.onSetPokemons(selectedPokemons);

        history.push('/game/board');
    }

    return (
        <div className={s.page}>
            <p>Lets click on some cards :)</p>
            <div className={s.nextPage}>
                <button onClick={handleSetPokemons}>
                    Start Game
                </button>
            </div>

            <div className={s.flex}>
                {
                    pokemons && Object.entries(pokemons).map(([key, item]) => (
                            <div key={key} className={s.root} onClick={() => selectPokemon(key)}>
                                <PokemonCard
                                    key={key}
                                    uniqKey={key}
                                    id={item.id}
                                    name={item.name}
                                    img={item.img}
                                    type={item.type}
                                    values={item.values}
                                    isActive={item.active === undefined ? true : item.active}
                                    isSelected={!!item.selected}
                                />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
};

export default StartGame;
