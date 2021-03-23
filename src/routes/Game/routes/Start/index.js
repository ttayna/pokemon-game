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
            setPokemons(
                Object.entries(pokemons).reduce((acc, [key, item]) => {
                    acc[key] = {...item, selected: !!pokemonContext.pokemons[key]};

                    return acc;
                }, {})
            );
        });

        return () => firebase.offPokemonSocket();
    }, [firebase]);

    const selectPokemon = (pokemonKey) => {
        const pokemon = {...pokemons[pokemonKey]};
        if (Object.keys(pokemonContext.pokemons).length >= 5 && !(pokemon.selected === true)) {
            return;
        }

        pokemonContext.onSetPokemon(pokemonKey, pokemon);
        setPokemons(prevState => ({
            ...prevState,
            [pokemonKey]: {
                ...prevState[pokemonKey],
                selected: !prevState[pokemonKey].selected
            }
        }));
    }

    const handleSetPokemons = () => {
        history.push('/game/board');
    }

    return (
        <div className={s.page}>
            <p>Lets click on some cards :)</p>
            <div className={s.nextPage}>
                <button
                    onClick={handleSetPokemons}
                    disabled={!Object.keys(pokemonContext.pokemons).length || Object.keys(pokemonContext.pokemons).length > 5}
                >
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
                                    isActive={true}
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
