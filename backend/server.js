

// require('dotenv').config(); 

// const express = require('express');
// const cors = require('cors'); 
// const app = express();
// const db = require('./db'); // koneksi DB
// const authRoutes = require('./routes/authRoutes'); 

// const fs = require('fs');
// const path = require('path');

// const uploadDir = path.join(__dirname, 'uploads');


// app.use(cors({
//   origin: 'http://localhost:8080', // 
//   credentials: true
// }));

// app.use(express.json());

// // Register route ke express
// app.use('/api/auth', authRoutes); 


// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });



// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
//   console.log('Folder uploads berhasil dibuat otomatis');
// }


require('dotenv').config(); 

const express = require('express');
const cors = require('cors'); 
const app = express();
const db = require('./db'); // koneksi DB
const authRoutes = require('./routes/authRoutes'); 

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');

app.use(cors({
  origin: '*', // sesuaikan sesuai domain front-end kamu
  credentials: true
}));

app.use(express.json());

// Register route ke express
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Folder uploads berhasil dibuat otomatis');
}
