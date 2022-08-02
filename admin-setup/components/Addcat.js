import { useState } from 'react'
import style from '../styles/Table.module.css'
export default function Add() {
  const [cat, setCat] = useState('')
  const [desc, setDesc] = useState('')
  const handleChange = (e, name) => {
    name(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let savedata = fetch('http://localhost:3000/api/categories', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        category: cat,
        description: desc,
      }),
    })

    savedata
      .then((res) => res.json())
      .then((data) => {
        if ((data.status = 'SUCCESS')) {
          setCat('')
          setDesc('')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={style.addproduct}>
      <div className={style.formrow}>
        <label>category name</label>
        <input
          type="text"
          value={cat}
          onChange={(e) => handleChange(e, setCat)}
        ></input>
      </div>
      <div className={style.formrow}>
        <label>description</label>
        <textarea
          value={desc}
          type="text"
          onChange={(e) => handleChange(e, setDesc)}
        ></textarea>
      </div>
      <div className={style.formrow}>
        <div>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className={style.btnflutter}
          >
            save
          </button>
        </div>
      </div>
    </div>
  )
}
