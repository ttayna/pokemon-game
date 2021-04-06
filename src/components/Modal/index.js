import {useEffect, useRef} from 'react';
import classNames from 'classnames';
import s from './style.module.css';

const Modal = ({isOpen, title, children, onCloseModal}) => {
    const modalEl = useRef();

    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
    }, [isOpen]);

    const handleCloseModal = () => {
        onCloseModal && onCloseModal(false);
    }

    const handleClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)) {
            onCloseModal(false);
        }
    }

    return (
        <div
            className={classNames(s.root, {[s.open]: isOpen})}
            onClick={handleClickRoot}
        >
            <div
                ref={modalEl}
                className={s.modal}
            >
                <div className={s.head}>
                    {title}
                    <span
                        className={s.btnClose}
                        onClick={handleCloseModal}
                    />
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Modal;
