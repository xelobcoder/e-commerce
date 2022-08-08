import { createConnection } from 'mysql';


const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})



connection.connect((err) => {
    if (err) throw err.message;
    else { console.log('connnection to database succesfull'); }
})

export default connection;