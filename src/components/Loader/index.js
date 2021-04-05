import React  from 'react'
import bg1 from '../../assets/loader.gif';
import s from './style.module.css';

const LoadingSpinner = () => (
    <div className={s.loadingSpinnerWrap}>
        <img src={bg1} alt="loading..."/>
    </div>
)

export default LoadingSpinner;