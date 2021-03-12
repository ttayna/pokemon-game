import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

import bg1 from './assets/bg1.jpg';
import bg2 from './assets/bg2.jpg';
// import bg3 from './assets/bg3.jpg';

const App = () => {
    return (
        <>
            <Header
                title="This is title"
                descr="This is Description!"
            />
            <Layout
                title="This is title for Layout 1"
                descr="This is Description for Layout 1!"
                urlBg={bg1}
            />
            <Layout
                title="This is title for Layout 2"
                colorBg="#154c79"
            />
            <Layout
                title="This is title for Layout 3"
                descr="This is Description for Layout 3!"
                urlBg={bg2}
            />
            <Footer />
        </>
    );
}

export default App;
