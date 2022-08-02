import connection from './db'
const category = {}

category.addcategory = (category, description, response) => {
  if ((category != '') & (description != '')) {
    const query = 'INSERT INTO category (category,description) VALUES (?,?)'
    connection.query(query, [category, description], (err, result) => {
      if (err) {
        response.status(500).send('Internal Server Error')
        throw err.message
      }
      response
        .status(200)
        .send({ message: 'Category added succesfully', status: 'SUCCESS' })
    })
  }
}

category.getcategories = (response) => {
  let query = 'SELECT * FROM category'
  connection.query(query, (err, result) => {
    if (err) {
      throw err.message
    }
    response.status(200).send(result)
  })
}

category.deletecategories = (id, response) => {
  if (id != '') {
    const query = 'DELETE FROM category WHERE id = ?'
    connection.query(query, [id], (err, result) => {
      if (err) {
        response.status(500).send('Internal Server Error')
        throw err.message
      }
      response.status(200).send('Category deleted succesfully')
    })
  }
}

category.queryrun = (id, res) => {
  let sqlquery = 'SELECT * FROM category WHERE id = ?'
  connection.query(sqlquery, [id], (err, result) => {
    if (err) {
      throw err
    }
    res.status(200).json(result)
  })
}
export default function handler(req, res) {
  const method = req.method
  switch (method) {
    case 'GET':
      if (req.query.hasOwnProperty('id')) {
        category.queryrun(req.query.id, res)
      } else {
        category.getcategories(res);
      }
      category.getcategories(res)
      break
    case 'POST':
      category.addcategory(req.body.category, req.body.description, res)
      break
    case 'DELETE':
      category.deletecategories(req.body.id, res)
      break
    default:
      res.status(405).send('Method not allowed')
  }
}
