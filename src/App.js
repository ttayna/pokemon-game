import { useState } from 'react';
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";

const App = () => {
    const [page, setPage] = useState('app');
    const handleChangePage = (page) => {
        setPage(page);
    };

    switch (page) {
        case 'app':
            return <HomePage onChangePage={handleChangePage} />
        case 'game':
            return <GamePage />;
        default:
            return <HomePage />
    }
};

export default App;