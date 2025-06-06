
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'ceritanusantara.site',    // bukan 'localhost'
//   user: 'ceritanu_admin',
//   password: 'dMUqfk${fzOg',
//   database: 'ceritanu_ceritanusantara',
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Database connected!');
// });

// module.exports = connection;



const mysql = require('mysql2');
require('dotenv').config(); // Untuk load .env

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Database connected!');
});

module.exports = connection;
