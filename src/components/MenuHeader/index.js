import {useState} from 'react';
import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = ({bgActive}) => {
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
                bgActive={bgActive}
                toggleMenu={toggleMenu}
            />
        </>
    );
};

export default MenuHeader;