import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, render = null, ...rest}) => {
    return (
        <>
            {localStorage.getItem('idToken') &&  Component &&
                <Route
                    {...rest}
                    render={props => <Component {...props} />}
                />
            }
            {localStorage.getItem('idToken') && render &&
                <Route
                    {...rest}
                    render={render}
                />
            }
            {!localStorage.getItem('idToken') &&
                <Route
                    {...rest}
                    render={() => <Redirect to="/"/>}
                />
            }
        </>
    );
};

export default PrivateRoute;
