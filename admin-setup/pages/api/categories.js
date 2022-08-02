import connection from './db'
const category = {}

category.addcategory = (category,description, response) => {
  if (category != '' & description != '') {
    const query = 'INSERT INTO category (category,description) VALUES (?,?)'
    connection.query(query, [category,description], (err, result) => {
      if (err) {
        response.status(500).send('Internal Server Error')
        throw err.message;
      }
      response.status(200).send({message: 'Category added succesfully',status:"SUCCESS"})
    })
  }
}

category.getcategories = (response) => {
  let query = 'SELECT * FROM category';
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

export default function handler(req, res) {
  const method = req.method;
  switch (method) {
    case 'GET':
      category.getcategories(res)
      break
    case 'POST':
      category.addcategory(req.body.category,req.body.description, res)
      break
    case 'DELETE':
      category.deletecategories(req.body.id, res)
      break
    default:
      res.status(405).send('Method not allowed')
  }
}
