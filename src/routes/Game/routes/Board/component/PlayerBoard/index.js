import {useContext, useState} from 'react';
import PokemonCard from "../../../../../../components/PokemonCard";
import {PokemonContext} from "../../../../../../context/pokemonContext";
import className from 'classnames';
import s from "./style.module.css";

const PlayerBoard = ({player, cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null);
    const pokemonContext = useContext(PokemonContext);

    return (
        <>
            {
                cards && cards.map((item) => (
                    <div
                        key={item.id}
                        className={className(s.card, {
                            [s.selected]: isSelected === item.id
                        })}
                        onClick={() => {
                            if (pokemonContext.currentPlayer === player) {
                                setSelected(item.id);
                                onClickCard && onClickCard({
                                    player,
                                    ...item
                                })
                            }
                        }}
                    >
                        <PokemonCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            img={item.img}
                            type={item.type}
                            values={item.values}
                            isActive
                            minimize
                        />
                    </div>
                ))
            }
        </>
    );
}

export default PlayerBoard;