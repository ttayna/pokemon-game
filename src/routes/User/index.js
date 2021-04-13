import Layout from "../../components/Layout";

import bg1 from '../../assets/bg1.jpg';
import {useSelector} from "react-redux";
import {selectUser, selectUserLoading} from "../../store/user";

const UserPage = () => {
    const isLoadingUser = useSelector(selectUserLoading);
    const userInfo = useSelector(selectUser);

    return (
        <>
            <Layout
                title="Users info"
                urlBg={bg1}
            >
                {
                    !isLoadingUser && userInfo && Object.entries(userInfo).map(([key, item]) => (
                        ['email', 'lastLoginAt', 'localId'].includes(key) && <p key={key}><strong>{key}</strong>: {item}</p>
                    ))
                }
            </Layout>
        </>
    );
}

export default UserPage;
