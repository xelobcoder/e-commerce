import style from '../styles/Product.module.css'
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function ProductForm({ catdata }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState([])
  const [features, setFeatures] = useState('');
  const [slug, setslug] = useState('')
  const [quantity, setQuantity] = useState('')
  const [cat, setCat] = useState([])
  const [imageviewoff, setimageviewoff] = useState(true)
  const [insertId, setInsertId] = useState(0);

  const hasMounted = useRef()
  const handleChange = (e, name) => {
    name(e.target.value)
  }

  const handleSelect = (e) => {
    const getcategories = () => {
      axios
        .get('http://localhost:3000/api/categories')
        .then((res) => {
          setCat(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getcategories()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = { name, price, description, category, slug, quantity,features }
    axios
      .post('http://localhost:3000/api/addproduct', { data })
      .then((res) => {
        const { status, insertid } = res.data;

        if (status == 'SUCCESS') {
          // load product image 
          const formData = new FormData();
          let file = document.getElementById('fileopen').files[0];
          formData.append('image', file);
          formData.append('id', insertid);

          fetch('http://localhost:3000/api/image', {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: formData,
          })
            .then(res => res.json())
            .then(res => {
              console.log(res)
            }).catch((err) => { console.log(err) })
        }
      })
      .catch((err) => {
        throw err;
      })
  }


  const imageupload = (e) => {
    let file = document.getElementById('fileopen');

    //  open file 

    file.click();

    // load file on change

    file.addEventListener('change', function () {
      let reader = new FileReader();

      reader.onload = function (e) {
        setimageviewoff(false);
        setImage(e.target.result);
      }

      reader.readAsDataURL(file.files[0]);
    }, false);



  }

  const imageWrapper = () => {
    return (
      <div className={style.box} id={imageviewoff ? 'image-prewiew-off' : 'image-prewiew-on'}>
        <div>
          <p className={style.boxchild}>add an image</p>
          <button onClick={(e) => imageupload(e)} type="button" className={style.btnflutter}>
            add image
          </button>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.wchild}>
          <form className={style.form}>
            <div className={style.formrow}>
              <label>product name</label>
              <input
                autoFocus
                type="text"
                value={name}
                name="productname"
                onChange={(e) => handleChange(e, setName)}
              ></input>
            </div>
            <div className={style.formrow}>
              <label>product category</label>
              <select
                onFocus={(e) => handleSelect(e)}
                value={category}
                className={style.formrow}
                onChange={(e) => handleChange(e, setCategory)}
              >
                {cat.map((item, index) => {
                  return (
                    <option key={index} value={item.category}>
                      {item.category}
                    </option>
                  )
                })}
              </select>
            </div>
            <div style={{ visibility: 'hidden' }}>
              <input id='fileopen' type='file'></input>
            </div>
            <div className={style.formrow}>
              <label>slug</label>
              <input
                type="text"
                value={slug}
                name="slug"
                onChange={(e) => handleChange(e, setslug)}
              ></input>
            </div>
            <div className={style.formrow}>
              <label>product price</label>
              <input
                type="number"
                name="productprice"
                value={price}
                onChange={(e) => handleChange(e, setPrice)}></input>
              <span>
                <i className="bi bi-currency-dollar"></i>
              </span>
            </div>
            <div className={style.formrow}>
              <label>quantity</label>
              <input
                className={quantity}
                onChange={(e) => handleChange(e, setQuantity)}
              />
            </div>
            <div className={style.formrow}>
              <label>product description</label>
              <textarea
                name="productdescription"
                value={description}
                onChange={(e) => handleChange(e, setDescription)}
              ></textarea>
            </div>

          </form>
          <form className={style.form}>
            <div className={style.formrow}>
              <label>product features</label>
              <textarea
                name="productfeatures"
                value={features}
                onChange={(e) => handleChange(e, setFeatures)}
              ></textarea>
            </div>
            <div className={style.formrow} >
              <label>product image</label>
              {imageviewoff ? imageWrapper() : <Image id='imagePreview' src={image} alt="product image" width={200} height={300} />}
              <div>
              </div>
            </div>
            <div
              className={style.formrow}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '30px',
                marginLeft: '10px',
              }}
            >
              <button
                onClick={(e) => handleSubmit(e)}
                className={style.btnflutter}
                style={{ width: '100%' }}
              >
                add product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProductForm;
