const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})



connection.connect((err) => {
    if (err) throw err.message;
    else { console.log('connnection to database succesfull'); }
})

module.exports = connection;