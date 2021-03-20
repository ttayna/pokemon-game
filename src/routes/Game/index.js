import {useState, useEffect} from 'react';
import PokemonCard from "../../components/PokemonCard";
import database from "../../service/firebase";
import POKEMONS from "../../data/pokemons.json";
import s from './style.module.css';

const GamePage = () => {
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        database.ref('pokemons').on('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    }, []);

    const selectPokemon = (pokemonKey) => {
        setPokemons(prevState => {
            return Object.entries(prevState).map(([key, item]) => {
                let active = false;
                if (pokemonKey === key) {
                    active = true;
                    database.ref('pokemons/' + key).update({'active': true});
                }

                return {...item, active: active};
            });
        });
    }

    const handleAddNewPokemon = () => {
        const k = Math.round(Math.random() * (POKEMONS.length - 1));
        let newPokemon = POKEMONS[k] ?? POKEMONS[0];

        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(newPokemon);
    }

    const handleResetStatusPokemon = () => {
        setPokemons(prevState => {
            let updates = {};
            const newState = Object.entries(prevState).map(([key, item]) => {
                const newItem = {...item, active: false}
                updates['pokemons/' + key] = newItem;
                return newItem;
            });

            if (updates) {
                database.ref().update(updates);
            }

            return newState;
        });
    }

    const setDefaultPokemons = () => {
        POKEMONS.forEach(item => {
            const newKey = database.ref().child('pokemons').push().key;
            database.ref('pokemons/' + newKey).set(item);
            return item;
        });
    }

    const handleResetPokemons = () => {
        database.ref('pokemons')
            .remove()
            .then(setDefaultPokemons);
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