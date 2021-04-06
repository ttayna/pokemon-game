import {useState} from "react";
import Input from "../Input";
import s from "./style.module.css";

const LoginForm = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setAuth] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
            email, password, isNewUser: isAuth
        });
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                name="email"
                label="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                label="Password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>
                { isAuth ? 'Create account' : 'Login' }
            </button>
            <span
                className={s.submit}
                onClick={() => setAuth(prev => !prev)}
            >
                { isAuth ? 'Sing in...' : 'Register?' }
            </span>
        </form>
    );
};

export default LoginForm;
