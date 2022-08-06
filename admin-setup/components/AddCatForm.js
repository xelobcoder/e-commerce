import { useState, useEffect } from "react";
import axios from 'axios';
import style from "../styles/Table.module.css";
import Error from './Error';
import { Button, Input, Textarea } from '@chakra-ui/react';

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

        if (editmode == 'false' && id == '0') {
            axios
                .post('http://localhost:3000/api/categories', { category: cat, description: desc })
                .then(res => {
                    document.getElementById('form').reset();
                })
                .catch((err) => { console.log(err) })
        } else {
           setCat(document.getElementById('category-input').value);
           setDesc(document.getElementById('description-input').value);
            axios
                .put(`http://localhost:3000/api/categories`, { id, category: cat, description: desc })
                .then(res => {
                    console.log(res.data)
                    document.getElementById('form').reset();
                    document.getElementById("category-input").disabled = false;
                    document.getElementById('catformwrapper').setAttribute('editmode', 'false');
                    document.getElementById('catformwrapper').setAttribute('editmode-id', '0');
                })
                .catch((err) => { console.log(err) })
        }
    }

    return (
        <div editmode="false" editmode-id="0" id="catformwrapper">
            <div>
                {error ? <Error /> : null}
            </div>
            <form id="form">
                <div >
                    <label>category title</label>
                    <Input id="category-input"  onChange={(e) => handleChange(e, setCat)} type='text' />
                </div>
                <div >
                    <label>description</label>
                    <Textarea id="description-input" onChange={(e) => handleChange(e, setDesc)} type='text' />
                </div>
                <div  >
                    <Button colorScheme='blue' variant="solid" onClick={(e) => handleSubmit(e)} type='submit' >Save</Button>
                </div>
            </form>
        </div>
    )
}


