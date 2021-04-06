import {useRouteMatch, Route, Switch, Redirect} from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import className from 'classnames';
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import {FireBaseContext} from "./context/firebaseContext";
import FirebaseClass from "./service/firebase";

import 'react-notifications/lib/notifications.css';
import s from './style.module.css';


const App = () => {
    const match = useRouteMatch('/');
    const matchHome = useRouteMatch('/home');
    const matchGame = useRouteMatch('/game/board');
    const isHomePage = (!match && !matchHome) || (match && match.isExact) || (matchHome && matchHome.isExact) || (matchGame && matchGame.isExact);

    return (
        <FireBaseContext.Provider value={FirebaseClass}>
            <Switch>
                <Route path="/404" render={() => (
                    <h1>404 Not Found</h1>
                )}/>
                <Route>
                    <>
                        <MenuHeader bgActive={!isHomePage}/>
                        <div className={className(s.wrap, {
                            [s.isHomePage]: isHomePage
                        })}>
                            <Switch>
                                <Route path="/" exact component={HomePage}/>
                                <Route path="/home" component={HomePage}/>
                                <PrivateRoute path="/game" component={GamePage}/>
                                <Route path="/contact" render={() => (
                                    <>
                                        <h1>This is Page Contact</h1>
                                        <p><a href="mailto:tananatayna@gmail.com">tananatayna@gmail.com</a></p>
                                    </>
                                )}/>
                                <PrivateRoute path="/about" render={() => (
                                    <h1>This is Page About</h1>
                                )}/>
                                <Route render={() => (
                                    <Redirect to="/404"/>
                                )}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </>
                </Route>
            </Switch>
            <NotificationContainer />
        </FireBaseContext.Provider>
    )
};

export default App;