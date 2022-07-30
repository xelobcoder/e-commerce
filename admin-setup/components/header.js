import style from '../styles/Home.module.css'
export default function Header() {
  return (
    <>
        <div className={style.header}>
            <div className={style.headerchld}>
               <button className="btn-light-pt">logout</button>
            </div>
        </div>
    </>
  )
}