import classNames from 'classnames';
import s from './style.module.css';

import {ReactComponent as LoginSVG} from '../../assets/login.svg';

const NavBar = ({isActiveMenu, bgActive = false, toggleMenu, onClickLogin, showLogin}) => {
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
                <div className={s.loginAndMenu}>
                    {
                        showLogin &&
                        <div
                            className={s.loginWrap}
                            onClick={onClickLogin}
                        >
                            <LoginSVG/>
                        </div>
                    }
                    <div
                        className={classNames(s.menuButton, {[s.active]: isActiveMenu})}
                        onClick={handleClick}
                    >
                        <span/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;