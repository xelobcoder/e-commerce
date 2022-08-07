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

function ViewList(props) {
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
    hasmounted.current = true

    if (hasmounted.current) {
      getData()
    }
  }, [])


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
    <div>
      <Table cellPadding="5px" style={{ height: '50vh', overflowX: 'auto', overflowY: 'auto' }} >
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
                  <Td>{index + 1}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <ButtonGroup gap={4}>
                      <Button size="sm" variant="solid" type='button' colorScheme='green' edit-id={item.id} onClick={(e) => props.handleEdit(e)}>
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
