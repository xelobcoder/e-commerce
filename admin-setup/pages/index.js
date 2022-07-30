import Head from 'next/head'
import Sidebar from '../components/sidebar'
import AddProducts from '../components/addproduct'
import style from '../styles/Home.module.css'
import Header from '../components/header'

export default function Home() {
  const hideandshow = (ev, target) => {
    let all = document.querySelectorAll('.main-section')
    all.forEach((item) => {
      item.style.display = 'none'
    })
    document.querySelector(target).style.display = 'block'
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.sidebar}>
          <div className="top-panel-side">
            <ul>
              <li onClick={(e) => hideandshow(e, '#addproduct')}>
                add products
              </li>
              <li onClick={(e) => hideandshow(e)}>product list</li>
              <li onClick={(e) => hideandshow(e)}>category</li>
              <li onClick={(e) => hideandshow(e)}>blog</li>
              <li onClick={(e) => hideandshow(e)}>settings</li>
            </ul>
          </div>
        </div>
        <main className={style.main}>
          <div className="main-section" id="addproduct">
            <AddProducts />
          </div>
        </main>
      </div>
    </>
  )
}
