import { useState } from 'react';
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";

const App = () => {
    const [page, setPage] = useState('app');
    const handleChangePage = (page) => {
        setPage(page);
    };

    switch (page) {
        case 'game':
            return <GamePage onChangePage={handleChangePage}/>;
        case 'app':
        default:
            return <HomePage onChangePage={handleChangePage}/>
    }
};

export default App;