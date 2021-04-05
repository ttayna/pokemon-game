import {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getPokemonsAsync,
    pokemonsData,
    pokemonsLoading,
} from "../../../../store/pokemons";
import {
    setPlayer1Pokemons,
    pokemonsPlayer1Data,
} from "../../../../store/board";
import PokemonCard from "../../../../components/PokemonCard";
import LoadingSpinner from "../../../../components/Loader";
import s from './style.module.css';

const StartGame = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(pokemonsLoading);
    const pokemonsRedux = useSelector(pokemonsData);
    const pokemonsPlayer1 = useSelector(pokemonsPlayer1Data);

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        // pokemonContext.onClear();
        dispatch(getPokemonsAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);

    useEffect(() => {
        const selectedPokemons = [];
        Object.entries(pokemons).forEach(([key, item]) => {
            if (!!item.selected) {
                selectedPokemons[key] = item;
            }
        })

        dispatch(setPlayer1Pokemons(selectedPokemons));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemons]);


    const selectPokemon = (pokemonKey) => {
        const pokemon = {...pokemons[pokemonKey]};
        if (Object.keys(pokemonsPlayer1).length >= 5 && !(pokemon.selected === true)) {
            return;
        }

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
                    disabled={Object.keys(pokemonsPlayer1).length !== 5}
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
