import connection from './db'
import multer from 'multer'
import path from 'path'

const products = {}

products.addproduct = (
  name,
  category,
  price,
  quantity,
  description,
  image,
  response,
) => {
  if ((name !== '') & (category != '') && (price != '') & (image != '')) {
    const query =
      'INSERT INTO products (name,category,price,quantity,description,image) VALUES (?,?,?,?,?,?)'
    connection.query(
      query,
      [name, category, price, quantity, description, image],
      (err, result) => {
        if (err) {
          response.status(500).send('Internal Server Error')
          throw err.message
        }
        response.status(200).send('Product added succesfully')
      },
    )
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

products.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  },
})


product.MAX_SIZES = 5 * 1000 * 1000;



products.streamImage = function (images = []) {
  if (images.length == 0) {
    response.status(400).json({
      error: 'no images found',
    })
  }

  //  save file into folder

  if (images.length > 0) {
    images.forEach((image) => {})
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
      const {
        name,
        category,
        price,
        quantity,
        description,
        image,
      } = request.body

      products.addproduct(
        name,
        category,
        price,
        quantity,
        description,
        image,
        response,
      )
    case 'DELETE':
      const { id } = request.body
      products.deleteproducts(id, response)
      break
    default:
      response.status(405).send('Method not allowed')
  }
}
