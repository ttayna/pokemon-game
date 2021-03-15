import {useState} from 'react';
import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = () => {
    const [isActiveMenu, setActiveMenu] = useState(false);

    const showMenu = () => {
        setActiveMenu(true);
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
                showMenu={showMenu}
                hideMenu={hideMenu}
            />
        </>
    );
};

export default MenuHeader;