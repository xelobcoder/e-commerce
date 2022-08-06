import style from '../styles/Header.module.css';
import Link from 'next/link';
export default function Header() {
  return (
    <>
      <div className={style.hp}>
        <ul>
          <li><i className="bi bi-file-earmark-plus"></i><Link href='/addproducts'><a>Add products</a></Link></li>
          <li><i className="bi bi-bag-fill"></i><Link href='/productlist'><a>productlist</a></Link></li>
          <li><i className="bi bi-book"></i><Link href='/blog'><a>blog</a></Link></li>
          <li><i className="bi bi-collection"></i><Link href='/categories'><a>categories</a></Link></li>
          <li><i className="bi bi-gear"></i> <Link href='/settings'><a>settings</a></Link></li>
        </ul>
      </div>
    </>
  )
}