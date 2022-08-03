import { useState } from "react";
import axios from 'axios';
import style from "../styles/Table.module.css";
import Error from './Error';
export default function AddFormCategory() {
    const [cat, setCat] = useState('')
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e, name) => { name(e.target.value) }
    const handleSubmit = (e) => {
        e.preventDefault();
        let mode = document.getElementById('catformwrapper');
        let editmode = mode.getAttribute('editmode');
        let id = mode.getAttribute('editmode-id');

        if(editmode == 'false' && id == '0') {
            axios
            .post('http://localhost:3000/api/categories', { category: cat, description: desc })
            .then(res => {
                setCat('');
                setDesc('');
                setError('');
            })
            .catch((err) => { console.log(err) })
        } else {
            setCat(document.getElementById('category-input').value);
            setDesc(document.getElementById('description-input').value);
            axios
            .put(`http://localhost:3000/api/categories`, { id,category: cat, description: desc })
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => { console.log(err) })
            console.log(cat,desc)
        }
    }

    return (
        <div editmode="false" editmode-id="0" id="catformwrapper">
            <div>
                {error ? <Error /> : null}
            </div>
            <div className={style.formrow}>
                <label>category title</label>
                <input id="category-input" value={cat} onChange={(e) => handleChange(e, setCat)} type='text' />
            </div>
            <div className={style.formrow}>
                <label>description</label>
                <textarea id="description-input" value={desc} onChange={(e) => handleChange(e, setDesc)} type='text' />
            </div>
            <div className={style.formrow} >
                <button className={style.btnflutter} style={{ padding: '15px', fontSize: '20px' }} onClick={(e) => handleSubmit(e)} type='submit'>save</button>
            </div>
        </div>
    )
}


