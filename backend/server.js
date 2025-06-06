
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const app = express();

// const db = require('./db'); // koneksi database kamu
// const authRoutes = require('./routes/authRoutes'); // route API kamu

// const uploadDir = path.join(__dirname, 'uploads');

// // Setup CORS supaya bisa diakses dari mana saja (development)
// app.use(cors({
//   origin: '*',  // bebas akses dari semua origin (untuk development)
//   credentials: true,
// }));

// // Middleware untuk parsing JSON body
// app.use(express.json());

// // ⬅️ Tambahkan ini supaya file di folder /uploads bisa diakses publik
// app.use('/uploads', express.static(uploadDir));

// // Register route API
// app.use('/api/auth', authRoutes);

// // Root route, hanya untuk cek server jalan
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Pastikan folder uploads ada
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
//   console.log('Folder uploads berhasil dibuat otomatis');
// }

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });



require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const db = require('./db'); // koneksi database
const authRoutes = require('./routes/authRoutes'); // route API

const uploadDir = path.join(__dirname, 'uploads');

// Setup CORS supaya bisa diakses dari mana saja
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Middleware untuk parsing JSON body
app.use(express.json());

// Public folder untuk akses file uploads
app.use('/uploads', express.static(uploadDir));

// Register route API
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Pastikan folder uploads tersedia
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Folder uploads berhasil dibuat otomatis');
}

// Gunakan port dari env atau default ke 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
