import classNames from 'classnames';
import s from './style.module.css';

const Layout = ({title, urlBg, colorBg, children}) => {
    const style = {
        backgroundColor: colorBg || '',
        backgroundImage: urlBg ? `url(${urlBg})` : 'none',
    };

    return (
        <section className={s.root}>
            <div className={s.wrapper} style={style}>
                <article>
                    {
                        title &&
                        <div className={s.title}>
                            <h3>{title}</h3>
                            <span className={s.separator}/>
                        </div>
                    }
                    {
                        children &&
                        <div className={classNames(s.desc, s.full)}>
                            {children}
                        </div>
                    }
                </article>
            </div>
        </section>
    );
}

export default Layout;