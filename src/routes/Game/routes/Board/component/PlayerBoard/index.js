import {useState} from 'react';
import PokemonCard from "../../../../../../components/PokemonCard";
import {useSelector} from "react-redux";
import {
    currentPlayer,
} from "../../../../../../store/pokemons";
import className from 'classnames';
import s from "./style.module.css";

const PlayerBoard = ({player, cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null);
    const currentPlayerRedux = useSelector(currentPlayer);

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
                            if (currentPlayerRedux === player) {
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