import style from '../styles/Product.module.css';
import Head from 'next/head';
import { useState,useEffect} from 'react';



function AddProducts({catdata}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [slug,setslug] = useState('');
  const [quanity,setQuantity] = useState('');

  const handleChange = (e,name) => {
     name(e.target.value);
  }


  return (
    <>
      <div className={style.wrapper}>
        <div className={style.wchild}>
        <form className={style.form}>
          <div className={style.formrow}>
            <label>product name</label>
            <input type="text" value={name} name="productname" onChange={(e) => handleChange(e,setName)}></input>
          </div>
          <div className={style.formrow}>
            <label>product category</label>
            <select value={category} className={style.formrow} onChange={(e) => handleChange(e,setCategory)}>
             
            </select>
          </div>
          <div className={style.formrow}>
            <label>slug</label>
            <input type="text" value={slug} name="slug" onChange={(e) => handleChange(e,setslug)}></input>
          </div>
          <div className={style.formrow}>
            <label>product price</label>
            <input type="number" name="productprice" value={price} onChange={(e) => handleChange(e,setPrice)}></input>
            <span><i className="bi bi-currency-dollar"></i></span>
          </div>
          <div className={style.formrow}>
             <label>quantity</label>
             <input className={quanity} onChange={(e) => handleChange(e,setQuantity)} />
          </div>
          <div className={style.formrow}>
            <label>product description</label>
            <textarea name="productdescription" onChange={(e) => handleChange(e,setDescription)} >write something here</textarea>
          </div>
        </form>
          <form>
            <div className={style.formrow}>
              <label>product image</label>
              <input type="file" name="productimage" onChange={(e) => handleChange(e,setImage)}></input>
            </div>
          </form>
        </div>
       
      </div>
    </>
  )
}

export default AddProducts


export async function getServerSideProps() {
 const data = await fetch('http://localhost:3000/api/categories');
  const catdata = await data.json();
  console.log(catdata)
  return {
    props: {
      catdata,
      ctx: 'new product'
    }
  }
}