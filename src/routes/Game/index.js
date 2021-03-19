import {useState} from 'react';
import PokemonCard from "../../components/PokemonCard";
import POKEMONS from "../../data/pokemons.json";
import s from './style.module.css';

const GamePage = () => {
    const [pokemons, setPokemons] = useState(POKEMONS);

    const selectPokemon = (id) => {
        setPokemons(prevState => prevState.map(item => item.id === id ? {...item, active: !item.active} : item))
    }


    return (
        <div className={s.page}>
            <p>Lets click on some cards :)</p>

            <div className={s.flex}>
                {
                    pokemons.map(
                        item => <PokemonCard
                            key={item.id}
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