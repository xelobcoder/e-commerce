import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import style from "../styles/Table.module.css";
import Error from './Error';
import { Button, Input, Textarea } from '@chakra-ui/react';

export default function AddFormCategory(props) {
    const [cat, setCat] = useState('')
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');
    const hasmounted = useRef(false);

    const handleChange = (e, name) => { name(e.target.value) }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.editstate == true) {
            let category = document.createElement('category-input').value;
            let description = document.createElement('description-input').value;
            axios.put('http://localhost:3000/api/categories', { id: props.editid, category, description })
                .then(res => { return res.data })
                .then(data => { console.log(data) })
                .catch((err) => { console.log(data) })
                .finally((res) => {
                    document.getElementById('form').reset();
                })
        } else {
            axios.post('http://localhost:3000/api/categories', { category: cat, description: desc })
                .then(res => { return res.data })
                .then(data => { document.getElementById('form').reset(); })
                .catch((err) => { console.log(data) })
        }
    }

    useEffect(() => {
        hasmounted.current = props.editstate;
        if (hasmounted.current == true) {
            if (props.editstate == true) {
                console.log(props.editid)
                axios.get(`http://localhost:3000/api/categories/?id=${props.editid}`)
                    .then((res) => { return res.data.data })
                    .then((data) => {
                        console.log(data)
                        document.getElementById('category-input').value = data[0].category;
                        document.getElementById('description-input').value = data[0].description;
                    })
                    .catch((err) => { console.log(err) })
            }
        }
    }, [props.editstate])

    return (
        <div>
            <div>
                {error ? <Error /> : null}
            </div>
            <form id="form">
                <div >
                    <label>category title</label>
                    <Input id="category-input" onChange={(e) => handleChange(e, setCat)} type='text' />
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


