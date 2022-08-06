import style from '../styles/Table.module.css'
import { useState } from 'react'
import Add from './Addcat';
import ViewList from './viewCat';
import {Button} from '@chakra-ui/react'
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
    <div className={style.category_wrapper}>
      <div>
        {
          addbtn ? (
            <Button id='top-add-btn' colorScheme='teal' size='md' onClick={(e) => addhandler(e)}>add category</Button>
          ) : null}
        {viewbtn ? (
          <Button colorScheme='teal' onClick={(e) => viewHandler(e)}>view categories</Button>
        ) : null}

      </div>
      <div className={style.cardbody}>
        {add ? <Add /> : null}
        {view ? <ViewList /> : null}
      </div>

    </div>
  )
}

export default AddCategory


