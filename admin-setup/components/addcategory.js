import style from '../styles/Table.module.css'
import { useState } from 'react'
import Add from './Addcat';
import ViewList from './viewCat';

function AddCategory() {
  const [add, setAdd] = useState(false)
  const [view, setView] = useState(true)
  const [title, setTitle] = useState('Category list')
  const [addbtn, setaddbtn] = useState(true)
  const [viewbtn, setviewbtn] = useState(false)

  const viewHandler = (e) => {
    setaddbtn(true)
    setviewbtn(false)
    setTitle('Category list')
    setView(true)
    setAdd(false)
  }

  const addhandler = (e) => {
    setaddbtn(false)
    setviewbtn(true)
    setTitle('Add category to shop')
    setAdd(true)
    setView(false)
  }

  return (
    <>
      <div className={style.classModule}>
        <div className={style.card}>
          <div className={style.cardheader}>
            <div className={style.title}>{title}</div>
            <div className={style.headerchild}>
              {addbtn ? (
                <button onClick={(e) => addhandler(e)}>add category</button>
              ) : null}
              {viewbtn ? (
                <button onClick={(e) => viewHandler(e)}>view categories</button>
              ) : null}
            </div>
          </div>
          <div className={style.cardbody}>
            {add ? <Add /> : null}
            {view ? <ViewList /> : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategory


