// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//     } else {
//         console.log('Connected to database');
//     }
// });

// module.exports = db;


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,    // bukan 'localhost'
  port: process.env.DB_PORT,    // harus sesuai
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
