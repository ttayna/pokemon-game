import classNames from 'classnames';
import s from './style.module.css';

const NavBar = ({isActive, showMenu}) => {
    const handleClick = () => {
        showMenu && showMenu();
    }
    return (
        <nav id={s['navbar']}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <a
                    className={classNames(s.menuButton, {[s.active]: !isActive})}
                    onClick={handleClick}
                >
                    <span/>
                </a>
            </div>
        </nav>
    );
};

export default NavBar;