import s from './style.module.css';

const Layout = ({title, descr, urlBg, colorBg}) => {
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
                        descr &&
                        <div className={`${s.desc} ${s.full}`}>
                            <p>{descr}</p>
                        </div>
                    }
                </article>
            </div>
        </section>
    );
}

export default Layout;