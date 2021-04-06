import {useRouteMatch, Switch} from 'react-router-dom';
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import PrivateRoute from "../../components/PrivateRoute";

const GamePage = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute path={`${match.path}/`} exact component={StartPage} />
            <PrivateRoute path={`${match.path}/board`} component={BoardPage} />
            <PrivateRoute path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
    );
};

export default GamePage;