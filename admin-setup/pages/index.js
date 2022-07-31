import Head from 'next/head'
import Sidebar from '../components/sidebar'
import AddProducts from '../components/addproduct'
import style from '../styles/Home.module.css'
import Header from '../components/header'
import AddCategory from '../components/addcategory'
import ProductList from '../components/Productlist';
import Blog from '../components/Blog';
import Settings from '../components/Settings';

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
              <li onClick={(e) => hideandshow(e,'#productlist')}>product list</li>
              <li onClick={(e) => hideandshow(e,'#addcategory')}>category</li>
              <li onClick={(e) => hideandshow(e,'#addblog')}>blog</li>
              <li onClick={(e) => hideandshow(e,'#addsettings')}>settings</li>
            </ul>
          </div>
        </div>
        <main className={style.main}>
          <div className="main-section" id="addproduct">
            <AddProducts />
          </div>
          <div className='main-section' id='addcategory' style={{display:'none'}}>
             <AddCategory/>
          </div>
          <div className='main-section' id='addblog' style={{display:'none'}}>
            <Blog/>
          </div>
          <div className='main-section' id='addsettings' style={{display:'none'}}>
            <Settings/>
          </div>
          <div className='main-section' id='productlist' style={{display:'none'}}>
            <ProductList/>
          </div>
        </main>
      </div>
    </>
  )
}
