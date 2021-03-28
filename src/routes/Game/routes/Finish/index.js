import {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {FireBaseContext} from "../../../../context/firebaseContext";
import {useDispatch, useSelector} from "react-redux";
import {
    pokemonsPlayer1Data,
    pokemonsPlayer2Data,
    gameResult,
    clearState,
} from "../../../../store/pokemons";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css';

const Finish = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const firebase = useContext(FireBaseContext);
    const pokemonsPlayer1 = useSelector(pokemonsPlayer1Data);
    const pokemonsPlayer2 = useSelector(pokemonsPlayer2Data);
    const gameResultRedux = useSelector(gameResult);
    const [opponentPokemons, setOpponentPokemons] = useState(pokemonsPlayer2);

    const selectPokemon = (pokemon) => {
        if (gameResultRedux !== 'player1') {
            return;
        }
        setOpponentPokemons(prevState => prevState.map(item => ({
                ...item,
                selected: item.id === pokemon.id
            }))
        );
    }

    if (!Object.keys(pokemonsPlayer1).length || !Object.keys(pokemonsPlayer2).length) {
        history.replace('/game');
    }

    const clearPokemonContentAndGo = () => {
        dispatch(clearState());
        history.push('/game');
    }

    const handleFinishGame = () => {
        if (gameResultRedux !== 'player1') {
            clearPokemonContentAndGo();
        }

        const newPokemon = opponentPokemons.filter(item => item.selected);
        if (newPokemon.length) {
            firebase.getOnePokemon(newPokemon[0].id).then(pokemonBD => {
                if (!pokemonBD) {
                    let clearPokemon = newPokemon[0];
                    delete clearPokemon.selected;
                    firebase.addPokemon(clearPokemon, () => {
                        clearPokemonContentAndGo();
                    })
                } else {
                    clearPokemonContentAndGo();
                }
            })
        }
    }

    return (
        <div className={s.page}>
            <div className={s.result}>
                {
                    gameResultRedux === 'player1' &&
                    <>
                        <p>You won!</p>
                        <p>Choose one opponent card to save to your collection.</p>
                    </>
                }
                {
                    gameResultRedux === 'player2' &&
                    <>
                        <p>You lose!</p>
                        <p>Try once more</p>
                    </>
                }
                {
                    gameResultRedux === 'draw' &&
                    <>
                        <p>It's a draw!</p>
                        <p>Try once more</p>
                    </>
                }
            </div>

            <div className={s.flex}>
                {
                    Object.keys(pokemonsPlayer1) && Object.entries(pokemonsPlayer1).map(([key, item]) => (
                            <div key={key} className={s.root}>
                                <PokemonCard
                                    key={key}
                                    uniqKey={key}
                                    id={item.id}
                                    name={item.name}
                                    img={item.img}
                                    type={item.type}
                                    values={item.values}
                                    isActive
                                />
                            </div>
                        )
                    )
                }
            </div>

            <div className={s.nextPage}>
                <button
                    onClick={handleFinishGame}
                    disabled={gameResultRedux === 'player1' && !opponentPokemons.filter(item => item.selected).length}
                >
                    END GAME
                </button>
            </div>


            <div className={s.flex}>
                {
                    Object.keys(opponentPokemons) && Object.entries(opponentPokemons).map(item => (
                        <div key={item.id} className={s.root} onClick={() => selectPokemon(item)}>
                            <PokemonCard
                                id={item.id}
                                name={item.name}
                                img={item.img}
                                type={item.type}
                                values={item.values}
                                isActive={true}
                                isSelected={!!item.selected}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Finish;
