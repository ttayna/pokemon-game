import classNames from 'classnames';
import s from './style.module.css';

const NavBar = ({isActiveMenu, showMenu, hideMenu}) => {
    const handleClick = () => {
        if (isActiveMenu) {
            hideMenu && hideMenu();
        } else {
            showMenu && showMenu();
        }
    }
    return (
        <nav id={s['navbar']}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <a
                    className={classNames(s.menuButton, {[s.active]: isActiveMenu})}
                    onClick={handleClick}
                >
                    <span/>
                </a>
            </div>
        </nav>
    );
};

export default NavBar;