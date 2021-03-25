import {useState, useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {PokemonContext} from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard";
import PlayerBoard from "./component/PlayerBoard";
import ArrowChoice from "./component/ArrowChoice";
import classNames from 'classnames';
import s from './style.module.css';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if (item.card && item.card.possession === 'red') {
            player2Count++;
        }
        if (item.card && item.card.possession === 'blue') {
            player1Count++;
        }
    });

    return [player1Count, player2Count];
}

const BoardPage = () => {
    const history = useHistory();
    const pokemonContext = useContext(PokemonContext);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemonContext.pokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))
    });
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);

    async function fetchBoardData() {
        const boardRequest = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardResponse = await boardRequest.json();

        setBoard(boardResponse.data);
    }

    async function fetchPlayer2Data() {
        const player2Request = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const player2Response = await player2Request.json();

        setPlayer2(() => {
            return player2Response.data.map(item => ({
                ...item,
                possession: 'red',
            }));
        });

        pokemonContext.onSetOpponentPokemon(player2Response.data);
    }

    useEffect(() => {
        fetchBoardData();
        fetchPlayer2Data();

        setTimeout(() => {
            pokemonContext.setCurrentPlayer(Math.round(Math.random()) + 1);
        }, 2000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!Object.keys(pokemonContext.pokemons).length) {
        history.replace('/game');
    }

    const handlerClickBoardPlate = async (position) => {
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            }

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            setBoard(request.data);
            setSteps(prevState => (prevState + 1));
            setChoiceCard(null);
            pokemonContext.setCurrentPlayer(choiceCard.player === 1? 2 : 1);
        }
    }

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2);

            if (count1 > count2) {
                pokemonContext.onSetGameResult('player1');
            } else if (count1 < count2) {
                pokemonContext.onSetGameResult('player2');
            } else {
                pokemonContext.onSetGameResult('draw');
            }

            setTimeout(() => history.push('/game/finish'), 1000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps])

    return (
        <div className={s.root}>
            <ArrowChoice side={pokemonContext.currentPlayer} />
            <div className={classNames(s.currentPlayerOne, {[s.active]: pokemonContext.currentPlayer === 1})}/>
            <div className={s.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handlerClickBoardPlate(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize />
                            }
                        </div>
                    ))
                }
            </div>

            <div className={classNames(s.currentPlayerTwo, {[s.active]: pokemonContext.currentPlayer === 2})}/>
            <div className={s.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;
