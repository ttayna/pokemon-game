import s from './style.module.css';

const GamePage = ({onChangePage}) => {
    const handleClick = () => {
        onChangePage && onChangePage('app');
    };

    return (
        <div className={s.page}>
            <p>This is Game Page!!!</p>
            <button onClick={handleClick}>
                Go Home
            </button>
        </div>
    )
};

export default GamePage;