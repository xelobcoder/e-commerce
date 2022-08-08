import fs from 'fs';
import path from 'path';
import multer from 'multer';
import connection from './db';

// object for storing the images


let features = {}




features.objectify = (data) => {
    if (Array.isArray(data)) {
        return data;
    } else {
        // convert to array

        let array = JSON.parse(data);

        // return array

        return Object.values(data);
    }
}


features.get = (request, response) => {
    // get the product id
    let id = request.query.id;

    if (Object.keys(request.query).includes('id')) {
        connection.query('SELECT * FROM featureimages WHERE PRODUCT_ID = ?', [id], (err, result) => {
            if (err) {
                throw err;
            }
            response.send(result)
        })
    } else {
        connection.query('SELECT * FROM featureimages', (err, result) => {
            if (err) {
                throw err.message
            };
            response.send(result);
        }

        )
    }

}

features.post = (request, response) => {
    const { product_id, images } = request.body;

    // check if all the fields are filled

    if (!Object.keys(product_id).includes(product_id) || !Object.keys(images).includes(images)) {
        response.send({
            message: 'All fields required'
        });
    }

    if (product_id != '' && images != '') {
        // convert the images to array
        let imagesArray = features.objectify(images);



        connection.query('INSERT INTO featureimages (PRODUCT_ID,IMAGES) VALUES ?',
            [product_id, imagesArray],
            (err, result) => {
                if (err) {
                    throw err.message;
                }
                response.send({
                    message: 'Images added successfully'
                });
            })
    }

}


export default function handler(request, response) {
    switch (request.method) {
        case 'GET':
            features.get(request, response);
            break;
        case 'POST':

            break;
        case 'PUT':

            break;
        case 'DELETE':

            break;
        case 'PATCH':

            break;
        default:
            // not found
            response.status(400).send('Not Found')
    }
}