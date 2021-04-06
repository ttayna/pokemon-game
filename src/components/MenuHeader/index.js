import {useEffect, useState} from 'react';
import {NotificationManager} from "react-notifications";
import Menu from "../Menu";
import NavBar from "../NavBar";
import Modal from "../Modal";
import LoginForm from "../LoginForm";

const MenuHeader = ({bgActive}) => {
    const [isActiveMenu, setActiveMenu] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const [isAuthUser, setAuthUser] = useState(false);

    useEffect(() => {
        setAuthUser(!!localStorage.getItem('idToken'));
    }, []);

    const toggleMenu = () => {
        setActiveMenu(prev => !prev);
    }

    const hideMenu = () => {
        setActiveMenu(false);
    }

    const handleClickLogin = () => {
        setOpenModal(prev => !prev);
    }

    const handleSubmitLoginForm = async ({email, password, isNewUser = false}) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        }

        let response;
        if (isNewUser) {
            response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAXEsKkPASf_-fFUZ86voycfhkShVbSO8', requestOptions).then(res => res.json());
        } else {
            response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAXEsKkPASf_-fFUZ86voycfhkShVbSO8', requestOptions).then(res => res.json());
        }

        if (response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Wrong!');
        } else {
            localStorage.setItem('idToken', response.idToken);
            setAuthUser(true);
            NotificationManager.success('Success');
            handleClickLogin();
        }
    }

    return (
        <>
            <Menu
                isActive={isActiveMenu}
                hideMenu={hideMenu}
            />
            <NavBar
                isActiveMenu={isActiveMenu}
                isOpenModal={isOpenModal}
                bgActive={bgActive}
                toggleMenu={toggleMenu}
                onClickLogin={handleClickLogin}
                showLogin={!isAuthUser}
            />
            <Modal
                title="Log in..."
                isOpen={isOpenModal}
                onCloseModal={handleClickLogin}
            >
                <LoginForm
                    onSubmit={handleSubmitLoginForm}
                />
            </Modal>
        </>
    );
};

export default MenuHeader;