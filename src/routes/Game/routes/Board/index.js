import {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    pokemonsPlayer1Data,
    pokemonsPlayer2Data,
    getOpponentPokemonsAsync,
    setCurrentPlayer,
    currentPlayer,
    setGameResult,
} from "../../../../store/pokemons";
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
    const dispatch = useDispatch();
    const pokemonsPlayer1 = useSelector(pokemonsPlayer1Data);
    const pokemonsPlayer2 = useSelector(pokemonsPlayer2Data);
    const currentPlayerRedux = useSelector(currentPlayer);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemonsPlayer1).map(item => ({
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

    useEffect(() => {
        if (Object.keys(pokemonsPlayer2).length) {
            setPlayer2(() => {
                return pokemonsPlayer2.map(item => ({
                    ...item,
                    possession: 'red',
                }));
            });
        }
    }, [pokemonsPlayer2])

    useEffect(() => {
        fetchBoardData();
        dispatch(getOpponentPokemonsAsync());

        setTimeout(() => {
            dispatch(setCurrentPlayer(Math.round(Math.random()) + 1));
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!Object.keys(player1).length) {
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
            dispatch(setCurrentPlayer(choiceCard.player === 1? 2 : 1));
        }
    }

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2);

            if (count1 > count2) {
                dispatch(setGameResult('player1'))
            } else if (count1 < count2) {
                dispatch(setGameResult('player2'))
            } else {
                dispatch(setGameResult('draw'))
            }

            setTimeout(() => history.push('/game/finish'), 1000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps])

    return (
        <div className={s.root}>
            <ArrowChoice side={currentPlayerRedux} />
            <div className={classNames(s.currentPlayerOne, {[s.active]: currentPlayerRedux === 1})}/>
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

            <div className={classNames(s.currentPlayerTwo, {[s.active]: currentPlayerRedux === 2})}/>
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
