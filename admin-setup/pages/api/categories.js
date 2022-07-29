const category = {};


category.addcategory = (name, response) => {
    if (name != '') {
        const query = 'INSERT INTO categories (name) VALUES (?)'
        connection.query(query, [name], (err, result) => {
        if (err) {
            response.status(500).send('Internal Server Error')
            throw err.message
        }
        response.status(200).send('Category added succesfully')
        })
    }
}


category.getcategories = (response) => {
    let query = 'SELECT * FROM categories';
    connection.query(query, (err, result) => {
        if (err) {
            throw err.message
        }
        response.status(200).send(result)
    })
}

category.deletecategories = (id, response) => {
    if (id != '') {
        const query = 'DELETE FROM categories WHERE id = ?'
        connection.query(query, [id], (err, result) => {
            if (err) {
                response.status(500).send('Internal Server Error')
                throw err.message
            }
            response.status(200).send('Category deleted succesfully')
        })
    }
}


export default function handler(req,res) {
   const method = req.method;

   switch(method) {
         case 'GET':
            category.getcategories(res);
            break;
         case 'POST':
            category.addcategory(req.body.name, res);
            break; 
        case 'DELETE':
            category.deletecategories(req.body.id, res);
            break;
        default:
            res.status(405).send('Method not allowed');
   }
}