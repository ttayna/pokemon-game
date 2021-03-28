import {useState, useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {PokemonContext} from "../../../../context/pokemonContext";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonsAsync, selectPokemonsData, selectPokemonsLoading} from "../../../../store/pokemons";
import PokemonCard from "../../../../components/PokemonCard";
import LoadingSpinner from "../../../../components/Loader";
import s from './style.module.css';

const StartGame = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectPokemonsLoading);
    const pokemonContext = useContext(PokemonContext);
    const pokemonsRedux = useSelector(selectPokemonsData)

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        pokemonContext.onClear();
        dispatch(getPokemonsAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);

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
                    disabled={Object.keys(pokemonContext.pokemons).length !== 5}
                >
                    Start Game
                </button>
            </div>

            {isLoading && <LoadingSpinner />}
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
