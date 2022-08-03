import { useState } from 'react'
import style from '../styles/Table.module.css';
import Spinning from './Spinning';
import AddFormCategory from './AddCatForm';


export default function Add() {
 const [form,setForm] = useState(true);
 const [saving,setSaving] = useState(false);
  const [spinning,setSpinning] = useState(false);
  return (
    <>
      <div className={style.addproduct}>
        {saving ? <Spinning/> : <AddFormCategory/>}
      </div>
    </>
  )
}
