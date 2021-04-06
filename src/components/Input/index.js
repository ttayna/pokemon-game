import className from "classnames";
import s from "./style.module.css";

const Input = ({label, type = 'text', name, value, required = false, onChange}) => {
    return (
        <div className={s.root}>
            <input
                type={type}
                className={className(s.input, {[s.valid]: !!value})}
                name={name}
                value={value}
                required={required}
                onChange={onChange}
            />
            <span className={s.highlight}/>
            <span className={s.bar}/>
            <label className={s.label}>{label}</label>
        </div>
    );
};

export default Input;
