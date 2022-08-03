import connection from './db'

const products = {}


products.addproducts = (request, response) => {
  // const secondQuery = 'SELECT * FROM products WHERE name = ?'
  const { name, price, description, quantity, slug, category } = request.body.data;

  if (name != '' && price != '' && description != '' && quantity != '' && slug != '' && category != '') {
    const query = 'INSERT INTO products (name, price, description,quantity,slug,category) VALUES (?, ?, ?,?,?,?)'
    connection.query(query, [name, price, description, quantity, slug, category], (err, result) => {
      if (err) {
        response.status(500).send('Internal Server Error')
        throw err.message
      }
      response.status(200).send({
        status: 'SUCCESS',
        message: "Product added succesfully",
        insertid: result.insertId
      })
    })
  }
}


products.deleteproducts = (id, response) => {
  if (id != '') {
    const query = 'DELETE FROM products WHERE id = ?'
    connection.query(query, [id], (err, result) => {
      if (err) {
        response.status(500).send('Internal Server Error')
        throw err.message
      }
      response.status(200).send('Product deleted succesfully')
    })
  }
}



products.getproducts = (response) => {
  let query = 'SELECT * FROM products'
  connection.query(query, (err, result) => {
    if (err) {
      throw err.message
    }
    response.status(200).send(result)
  })
}

export default function handler(request, response) {
  const method = request.method

  switch (method) {
    case 'GET':
      products.getproducts(response)
      break
    case 'POST':
      console.log(request.body)
      products.addproducts(request, response);
      break
    case 'DELETE':
      const { id } = request.body
      products.deleteproducts(id, response)
      break
    default:
      response.status(405).send('Method not allowed')
  }
}
