import { useState } from 'react'
import style from '../styles/Table.module.css';
import Spinning from './Spinning';
import AddFormCategory from './AddCatForm';


export default function Add(props) {
 const [form,setForm] = useState(true);
 const [saving,setSaving] = useState(false);
 const [spinning,setSpinning] = useState(false);
 console.log(typeof props.editstate)
   return (
    <>
      <div className={style.addproduct}>
        <AddFormCategory editstate={props.editstate} editid={props.editid} />
      </div>
    </>
  )
}
