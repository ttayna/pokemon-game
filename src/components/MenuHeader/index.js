import {useState} from 'react';
import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = () => {
    const [isActiveMenu, setActiveMenu] = useState(null);

    const toggleMenu = () => {
        setActiveMenu(prev => !prev);
    }

    const hideMenu = () => {
        setActiveMenu(false);
    }

    return (
        <>
            <Menu
                isActive={isActiveMenu}
                hideMenu={hideMenu}
            />
            <NavBar
                isActiveMenu={isActiveMenu}
                toggleMenu={toggleMenu}
            />
        </>
    );
};

export default MenuHeader;