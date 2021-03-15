import classNames from 'classnames';
import s from './style.module.css';

const Menu = ({isActive, hideMenu}) => {
    const handleClickMenuItem = () => {
        hideMenu && hideMenu();
    };

    return (
        <div className={classNames(s.menuContainer, {[s.active]: isActive, [s.deactive]: !isActive})}>
            <div className={s.overlay}/>
            <div>
                <ul>
                    <li>
                        <a href="#welcome" onClick={handleClickMenuItem}>
                            HOME
                        </a>
                    </li>
                    <li>
                        <a href="#game" onClick={handleClickMenuItem}>
                            GAME
                        </a>
                    </li>
                    <li>
                        <a href="#about" onClick={handleClickMenuItem}>
                            ABOUT
                        </a>
                    </li>
                    <li>
                        <a href="#contact" onClick={handleClickMenuItem}>
                            CONTACT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;