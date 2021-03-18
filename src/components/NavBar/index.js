import classNames from 'classnames';
import s from './style.module.css';

const NavBar = ({isActiveMenu, bgActive = false, toggleMenu}) => {
    const handleClick = () => {
        toggleMenu();
    }
    return (
        <nav id={s['navbar']} className={classNames({
            [s.bgActive]: bgActive
        })}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <div
                    className={classNames(s.menuButton, {[s.active]: isActiveMenu})}
                    onClick={handleClick}
                >
                    <span/>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;