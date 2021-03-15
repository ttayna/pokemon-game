import {useState} from 'react';
import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = () => {
    const [activeComponent, setActiveComponent] = useState('navbar');

    const showNavBar = () => {
        setActiveComponent('navbar');
    }

    const showMenu = () => {
        setActiveComponent('menu');
    }

    return (
        <>
            <Menu
                isActive={activeComponent === 'menu'}
                showNavBar={showNavBar}
            />
            <NavBar
                isActive={activeComponent === 'navbar'}
                showMenu={showMenu}
            />
        </>
    );
};

export default MenuHeader;