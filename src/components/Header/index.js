import s from './style.module.css';

const Header = ({title, descr, handleClick}) => {
    return (
        <header className={s.root}>
            <div className={s.forest}/>
            <div className={s.silhouette}/>
            <div className={s.moon}/>
            <div className={s.container}>
                {title && <h1>{title}</h1>}
                {descr && <p>{descr}</p>}
                handleClick && <button onClick={handleClick}>
                    Start Game
                </button>
            </div>
        </header>
    );
}

export default Header;