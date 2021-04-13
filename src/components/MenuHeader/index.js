import {useState} from 'react';
import {NotificationManager} from "react-notifications";
import Menu from "../Menu";
import NavBar from "../NavBar";
import Modal from "../Modal";
import LoginForm from "../LoginForm";
import {useDispatch} from "react-redux";
import {getUserUpdateAsync, removeUser} from "../../store/user";
import {useHistory} from "react-router-dom";

const MenuHeader = ({bgActive}) => {
    const [isActiveMenu, setActiveMenu] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const toggleMenu = () => {
        setActiveMenu(prev => !prev);
    }

    const hideMenu = () => {
        setActiveMenu(false);
    }

    const handleClickLogin = () => {
        setOpenModal(prev => !prev);
    }

    const handleClickLogout = () => {
        dispatch(removeUser());
        localStorage.removeItem('idToken');
        history.push('/');
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
            if (isNewUser) {
                const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
                for (const item of pokemonsStart.data) {
                    await fetch(`https://pokemon-game-7885f-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    });
                }
            }

            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Success');
            dispatch(getUserUpdateAsync());
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
                onClickLogout={handleClickLogout}
            />
            <Modal
                title="Log in..."
                isOpen={isOpenModal}
                onCloseModal={handleClickLogin}
            >
                <LoginForm
                    isResetField={!isOpenModal}
                    onSubmit={handleSubmitLoginForm}
                />
            </Modal>
        </>
    );
};

export default MenuHeader;