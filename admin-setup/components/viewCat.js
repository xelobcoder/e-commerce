import style from '../styles/Table.module.css'
import axios from 'axios'
import { useState, useRef, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'

function ViewList() {
  const [data, setData] = useState([])

  const hasmounted = useRef(false)

  const getData = () => {
    let fetchdata = async function () {
      let res = await axios.get('http://localhost:3000/api/categories')
      setData(res.data)
    }
    fetchdata()
  }

  useEffect(() => {
    getData()
  }, [])


  // prefills the form with the data from the database 
  // for editing the category

  const prefill = (oobject = {}) => {
    const { id, category, description } = oobject;
    setTimeout(() => {
      document.getElementById('category-input').value = category;
      document.getElementById('description-input').value = description;
      let editmode = document.getElementById('catformwrapper');
      editmode.setAttribute('editmode', 'true');
      editmode.setAttribute('editmode-id', id);
      // document.getElementById('category-input').disabled = true;

      console.log(editmode)
    }, 100);
  }

  const handleEdit = (e) => {
    const tine = document.getElementById('main-add')
    console.log(tine)
    e.preventDefault()
    let id = e.target.getAttribute('edit-id')

    axios(`http://localhost:3000/api/categories?id=${id}`)
      .then((res) => {
        const { status, data } = res.data;
        if (status == 'SUCCESS') {
          document.getElementById('top-add-btn').click();
          prefill(data[0]);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    let id = e.target.getAttribute('delete-id')
    axios
      .delete(`http://localhost:3000/api/categories`, { data: { id } })
      .then((res) => {
        let deleteditem = data.findIndex((item) => item.id === id)
        data.splice(deleteditem)
        getData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div >
      <Table size='sm' variant='simple' colorScheme='teal' cellPadding="10px" >
        <Thead >
          <Tr>
            <Th>#</Th>
            <Th>category</Th>
            <Th>description</Th>
            <Th>actions</Th>
          </Tr>
        </Thead>
        <tbody>
          {data.length > 0
            ? data.map((item, index) => {
              return (
                <Tr key={index} data-id={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <ButtonGroup gap={4}>
                      <Button size="sm" variant="solid" type='button' colorScheme='green' edit-id={item.id} onClick={(e) => handleEdit(e)}>
                        edit
                      </Button>
                      <Button size="sm" variant="solid" type='button' colorScheme='red' delete-id={item.id} onClick={(e) => handleDelete(e)}>
                        delete
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              )
            })
            : null}
        </tbody>
      </Table>
    </div>
  )
}

export default ViewList
