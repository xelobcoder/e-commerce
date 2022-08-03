import style from '../styles/Error.module.css';
export default function Error(props) {
    return (
        <div className={style.wrapper}>
            <div className={style.error}>
                <div className={style.error__title}>
                <h1>{props.title}</h1>
                </div>
                <div className={style.error__text}>
                <p>{props.text}</p>
                </div>
            </div>
        </div>
    )
}