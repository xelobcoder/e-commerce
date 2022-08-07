import multer from 'multer';
import path from 'path';
import connection from './db';
import fs from 'fs';
import stream from 'stream';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/asserts/products')
    }
    , filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '' + Math.round(Math.random() * 1E9) + '' + path.extname(file.originalname);
        cb(null, uniqueSuffix)
    }
})

export const config = {
    api: {
        bodyParser: false,
    },
}


const productImage = multer({ storage: storage }).single('image');


const addImageDb = (request, response) => {
    let query = 'INSERT INTO product_images (product_id, image) VALUES (?, ?)';

    connection.query(query, [request.body.id, request.file.filename], (err, result) => {
        if (err) {
            response.status(500).send('Internal Server Error')
            throw err.message
        }
        response.status(200).send({
            status: 'SUCCESS',
            message: "Product image added succesfully",
        })
    });
}


const getImage = (request, response) => {
    let query = request.query;
    if (Object.keys(query) == 0) {
        connection.query('SELECT * FROM product_images', (err, result) => {
            if (err) {
                response.status(405).send('Internal Server Error');
                throw err;
            }
            response.status(200).send(result);
        })
    } else {
        let id = request.query.id;
        let imagePath = path.join('C:/Users/leonides/Desktop/payswitch/admin-setup/public/asserts/products', id);
        fs.createReadStream(imagePath).pipe(response);
    }
}
export default function handler(request, response) {
    switch (request.method) {
        case 'GET':
            getImage(request, response);
            break;
        case 'POST':
            productImage(request, response, (err) => {
                if (err) {
                    response.send(err.message)
                }
                addImageDb(request, response)
            })
            break;
        case 'PUT':
            response.status(200).json({ 'message': 'PUT request' })
        default:
            response.status(405).send('Method not allowed');
    }
};


