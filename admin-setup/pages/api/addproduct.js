import connection from './db'

const products = {}


products.addproducts = (request, response) => {
  // const secondQuery = 'SELECT * FROM products WHERE name = ?'
  const { name, price, description, quantity, slug, category, features } = request.body.data;

  if (name != '' && price != '' && description != '' && quantity != '' && slug != '' && category != '') {
    const query = 'INSERT INTO products (name, price, description,quantity,slug,category,features) VALUES (?, ?, ?,?,?,?,?)'
    connection.query(query, [name, price, description, quantity, slug, category, features], (err, result) => {
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



products.getproducts = (request, response) => {
  const id = request.query.id;

  if (Object.keys(request.query).length === 0) {
    let query = 'SELECT * FROM products';
    connection.query(query, (err, result) => {
      if (err) {
        throw err.message
      }
      response.status(200).send(result)
    })
  } else {
    const query = 'SELECT * FROM products WHERE id = ?'
    connection.query(query, [id], (err, result) => {
      if (err) {
        response.status(500).send('Internal Server Error')
        throw err.message
      }
      response.status(200).send(result)
    })
  }


}

export default function handler(request, response) {
  const method = request.method

  switch (method) {
    case 'GET':
      products.getproducts(request, response)
      break
    case 'POST':
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
