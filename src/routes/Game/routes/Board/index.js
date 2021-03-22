import {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {PokemonContext} from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css';

const BoardPage = () => {
    const history = useHistory();
    const pokemonContext = useContext(PokemonContext);

    const handleClick = () => {
        history.push('/game/finish');
    }

    return (
        <>
            <div className={s.nextPage}>
                <button onClick={handleClick}>
                    Finish
                </button>
            </div>
            <div className={s.root}>
                <div className={s.playerOne}>
                    {
                        pokemonContext.pokemons && Object.entries(pokemonContext.pokemons).map(([key, item]) => (
                                <PokemonCard
                                    key={key}
                                    uniqKey={key}
                                    id={item.id}
                                    name={item.name}
                                    img={item.img}
                                    type={item.type}
                                    values={item.values}
                                    isActive={item.active === undefined ? true : item.active}
                                    minimize={true}
                                    className={s.card}
                                />
                            )
                        )
                    }

                </div>
                <div className={s.board}>
                    <div className={s.boardPlate}>1</div>
                    <div className={s.boardPlate}>2</div>
                    <div className={s.boardPlate}>3</div>
                    <div className={s.boardPlate}>4</div>
                    <div className={s.boardPlate}>5</div>
                    <div className={s.boardPlate}>6</div>
                    <div className={s.boardPlate}>7</div>
                    <div className={s.boardPlate}>8</div>
                    <div className={s.boardPlate}>9</div>
                </div>
            </div>
        </>
    );
};

export default BoardPage;
