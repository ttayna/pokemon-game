import {Link} from 'react-router-dom';
import classNames from 'classnames';
import s from './style.module.css';

const MENU = [
    {
        title: 'HOME',
        to: '/home',
    },
    {
        title: 'GAME',
        to: '/game',
    },
    {
        title: 'ABOUT',
        to: '/about',
    },
    {
        title: 'CONTACT',
        to: '/contact',
    },
];

const Menu = ({isActive, hideMenu}) => {
    const handleClickMenuItem = () => {
        hideMenu && hideMenu();
    };

    return (
        <div className={classNames(s.menuContainer, {[s.active]: isActive, [s.deactive]: isActive === false})}>
            <div className={s.overlay}/>
            <div>
                <ul>
                    {
                        MENU.map(({title, to}, index) => (
                            <li key={index}>
                                <Link to={to} onClick={handleClickMenuItem}>
                                    {title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Menu;