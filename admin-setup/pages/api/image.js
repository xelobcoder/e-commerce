import multer from 'multer';
import path from 'path';
import connection from './db';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/asserts/products')
    }
    , filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() +''+ Math.round(Math.random() * 1E9) + '' + path.extname(file.originalname);
        cb(null, uniqueSuffix)
    }
})

export const config = {
    api: {
        bodyParser: false,
    },
}


const productImage = multer({ storage: storage }).single('image'); 

const product_image_fxn = function(req,res,filename) {
    const {id} = req.body;

    connection.query('INSERT INTO product_images (product_id,image) VALUES (?,?)', [id,filename], (err, result) => {
        if (err) {
            throw err.message
        }
        res.status(200).send('Product image added succesfully')
    });
}

export default function handler (request,response){
    switch(request.method) {
        case 'GET':
            connection.query('SELECT * FROM product_images', (err, result) => {
                if (err) {
                    throw err.message
                }
                response.status(200).send(result)
            })
            break;
        case 'POST':
            productImage(request, response, (err) => {
                console.log(request.file);
                if(err) { response.status(500).json({message:'error in processing image',file:''}) }
                else {
                    let filename = request.file.filename;
                    config.api.bodyParser = true;
                    product_image_fxn(request,response,filename);
                }
            })
            break;
        case 'PUT':
            response.status(200).json({'message':'PUT request'})
        default:
            response.status(405).send('Method not allowed');
    }
};


