import style from '../styles/product.module.css'
function AddCategory() {

  const Add = function () {
    return (
      <div className={style.addproduct}>
        <div className={style.formrow}>
          <label>category name</label>
          <input type="text" />
        </div>
        <div className={style.formrow}>
          <label>description</label>
          <textarea type="text" />
        </div>
        <div className={style.formrow}>
          <button type="submit" className={style.btnflutter}>
            save
          </button>
        </div>
      </div>
    )
  }
  

  const ViewList = function() {
    return(
      <>
        <table>
         <thead>
            <tr>
              <th>#</th>
              <th>category</th>
              <th>description</th>
              <th>actions</th>
            </tr>
         </thead>
         <tbody>
           <tr>
             <td>1</td>
             <td>means wear</td>
             <td>means product features</td>
             <td>
                <button className='btn btn-info'>edit</button>
                <button className='btn btn-danger'>delete</button>
             </td>
           </tr>
         </tbody>
        </table>
      </>

    )
  }


  return(
    <>
      <ViewList/>
      <Add/>
    </>
  )


}

export default AddCategory
