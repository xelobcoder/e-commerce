import connection from "./db"

const products = {}



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
  const method = request.method;

  switch (method) {
    case 'GET':
      products.getproducts(response)
      break
    case 'POST':
      console.log(request.body['name'])
      break
    case 'DELETE':
      const { id } = request.body
      products.deleteproducts(id, response)
      break
    default:
      response.status(405).send('Method not allowed')
  }
}
