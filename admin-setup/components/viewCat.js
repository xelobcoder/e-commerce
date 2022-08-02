import style from '../styles/Table.module.css'
import axios from 'axios'
import { useState, useRef, useEffect } from 'react'

function ViewList() {
  const [data, setData] = useState([])

  const hasmounted = useRef(false)

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/categories')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        hasmounted.current = true
      })
  }, [])

  const handleDelete = (e) => {
    e.preventDefault()
    let id = e.target.getAttribute('delete-id')
    axios
      .delete(`http://localhost:3000/api/categories`, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res)
        let index = data.findIndex((item) => item.id === id)
        data.splice(index)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className={style.wrapper}>
      <table className={style.table} cellPadding="10px">
        <thead className={style.thead}>
          <tr>
            <th>#</th>
            <th>category</th>
            <th>description</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index} data-id={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>
                      <button className="btn btn-info" edit-id={item.id}>
                        edit
                      </button>
                      <button
                        className="btn btn-danger"
                        delete-id={item.id}
                        onClick={(e) => handleDelete(e)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default ViewList
