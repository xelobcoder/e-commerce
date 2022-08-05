import Head from 'next/head'
import Sidebar from '../components/sidebar'
import AddProducts from '../components/addproduct'
import style from '../styles/Home.module.css'
import Header from '../components/header'
import AddCategory from '../components/addcategory'
import ProductList from '../components/Productlist';
import Blog from '../components/Blog';
import Settings from '../components/Settings';
import { useState } from 'react';

export default function Home() {
  const [menu, setMenu] = useState(true);

  const hideandshow = (ev, target) => {
    let all = document.querySelectorAll('.main-section')
    all.forEach((item) => {
      item.style.display = 'none'
    })
    setMenu(!menu)
    document.querySelector(target).style.display = 'block'
  }

  const menuHandler = (e) => {
    setMenu(!menu)
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.sidebar}>
          <div className="top-panel-side">
            <div className='menu-icon' onClick={(e) => menuHandler(e)}><i class="bi bi-list"></i></div>
            {
              menu == false ? null : (
                <ul>
                  <li onClick={(e) => hideandshow(e, '#addproduct')}>
                    <i class="bi bi-bag-check-fill"></i> Add products
                  </li>
                  <li onClick={(e) => hideandshow(e, '#productlist')}>
                    <i class="bi bi-card-checklist"></i> Product list
                  </li>
                  <li onClick={(e) => hideandshow(e, '#addcategory')}>
                    <i class="bi bi-bookmark"></i> Category
                  </li>
                  <li onClick={(e) => hideandshow(e, '#addblog')}>
                    <i class="bi bi-newspaper"></i> Blog</li>
                  <li onClick={(e) => hideandshow(e, '#addsettings')}>
                    <i class="bi bi-gear"></i> Settings
                  </li>
                </ul>
              )
            }
          </div>
        </div>
        <main className={style.main}>
          <div className="main-section" id="addproduct">
            <AddProducts />
          </div>
          <div className='main-section' id='addcategory' style={{ display: 'none' }}>
            <AddCategory />
          </div>
          <div className='main-section' id='addblog' style={{ display: 'none' }}>
            <Blog />
          </div>
          <div className='main-section' id='addsettings' style={{ display: 'none' }}>
            <Settings />
          </div>
          <div className='main-section' id='productlist' style={{ display: 'none' }}>
            <ProductList />
          </div>
        </main>
      </div>
    </>
  )
}


