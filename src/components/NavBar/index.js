import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import classNames from 'classnames';
import s from './style.module.css';

import {ReactComponent as LoginSVG} from '../../assets/login.svg';
import {ReactComponent as LogoutSVG} from '../../assets/logout.svg';
import {ReactComponent as UserSVG} from '../../assets/user.svg';
import {selectLocalId, selectUserLoading} from "../../store/user";

const NavBar = ({isActiveMenu, bgActive = false, toggleMenu, onClickLogin, onClickLogout}) => {
    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalId);

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
                        !isLoadingUser && !localId &&
                            <div
                                className={s.loginWrap}
                                onClick={onClickLogin}
                            >
                                <LoginSVG/>
                            </div>
                    }
                    {
                        !isLoadingUser && localId &&
                            <>
                                <Link
                                    className={s.loginWrap}
                                    to="/user"
                                >
                                    <UserSVG/>
                                </Link>
                                <div
                                    className={s.loginWrap}
                                    onClick={onClickLogout}
                                >
                                    <LogoutSVG/>
                                </div>
                            </>
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