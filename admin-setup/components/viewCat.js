import style from '../styles/Table.module.css'
import axios from 'axios'
import { useState, useRef, useEffect } from 'react'

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

  const prefill = (oobject = {}) =>{
    const {id, category, description} = oobject;
    setTimeout(() => {
      document.getElementById('category-input').value = category;
      document.getElementById('description-input').value = description;
      let editmode = document.getElementById('catformwrapper');
      editmode.setAttribute('editmode', 'true');
      editmode.setAttribute('editmode-id', id);
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
        const {status, data} = res.data;
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
                      <button className="btn btn-info" edit-id={item.id} onClick={(e) => handleEdit(e)}>
                        edit
                      </button>
                      <button className="btn btn-danger" delete-id={item.id} onClick={(e) => handleDelete(e)}>
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
