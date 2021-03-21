import {useState, useEffect} from 'react';
import PokemonCard from "../../components/PokemonCard";
import database from "../../service/firebase";
import POKEMONS from "../../data/pokemons.json";
import s from './style.module.css';

const GamePage = () => {
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    }, []);

    const selectPokemon = (pokemonKey) => {
        database.ref('pokemons/' + pokemonKey).update({'active': true})
            .then(() =>
                setPokemons(prevState =>
                    Object.entries(prevState).reduce((acc, [key, item]) => {
                        const pokemon = {...item};

                        acc[key] = key === pokemonKey ? {...pokemon, active: true} : pokemon;

                        return acc;
                    }, {})
                )
            );
    }

    const handleAddNewPokemon = () => {
        const k = Math.round(Math.random() * (POKEMONS.length - 1));
        let newPokemon = POKEMONS[k] ?? POKEMONS[0];

        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(newPokemon)
            .then(() => setPokemons(prevState => {
                return {...prevState, [newKey]: newPokemon};
            }));
    }

    const handleResetStatusPokemon = () => {
        setPokemons(prevState =>
             Object.entries(prevState).reduce((acc, [key, item]) => {
                const pokemon = {...item};
                pokemon.active = false;
                database.ref('pokemons/' + key).update({'active': false});
                acc[key] = pokemon;

                return acc;
            }, {})
        );
    }

    const handleResetPokemons = () => {
        const count = 5;
        setPokemons(prevState =>
            Object.entries(prevState).reduce((acc, [key, item], index) => {
                if (index >= count) {
                    database.ref('pokemons').child(key).remove();
                } else {
                    const pokemon = {...item};
                    pokemon.active = false;
                    database.ref('pokemons/' + key).update({'active': false});
                    acc[key] = pokemon;
                }

                return acc;
            }, {})
        );
    }

    return (
        <div className={s.page}>
            <p>Lets click on some cards :)</p>

            <div className={s.resetPokemons}>
                <button onClick={handleResetStatusPokemon}>
                    Reset status
                </button>
                <button className={s.remove} onClick={handleResetPokemons}>
                    Reset count of pokemons
                </button>
            </div>
            <div className={s.newPokemon}>
                <button onClick={handleAddNewPokemon}>
                    Add new pokemon
                </button>
            </div>

            <div className={s.flex}>
                {
                    pokemons && Object.entries(pokemons).map(([key, item]) =>
                        <PokemonCard
                            key={key}
                            uniqKey={key}
                            id={item.id}
                            name={item.name}
                            img={item.img}
                            type={item.type}
                            values={item.values}
                            isActive={!!item.active}
                            selectPokemon={selectPokemon}
                        />
                    )
                }
            </div>
        </div>
    )
};

export default GamePage;