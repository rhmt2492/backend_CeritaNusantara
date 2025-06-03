const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/uploads'); // multer middleware untuk upload gambar

// User Login/Register
router.post('/register', authController.register);
router.post('/login', authController.login);

// Lupa Password
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
// Lupa Password

//Detail Users
router.post('/detail-users', authController.createDetailUser);
router.get('/detail-users/:user_id', authController.getDetailUser);
router.put('/detail-users/:user_id', authController.updateDetailUser);
// Detail Users

// Tambah Cerita
router.post('/tambah-cerita', upload.single('img'), authController.tambahCerita);
router.put('/cerita/:id/status', authController.updateStatusCerita);
// Tambah Cerita

// Waiting list
router.get('/waiting-list', authController.getWaitingListWithCerita);
router.post('/analisis-cerita', authController.simpanAnalisisCerita);
// waiting list

// media
// Like
router.post('/like', authController.likeCerita);
router.post('/unlike', authController.unlikeCerita);

// Komentar
router.post('/komentar', authController.tambahKomentar);
router.get('/komentar/:id_cerita', authController.getKomentarByCerita);

// Favorit
router.post('/favorit', authController.tambahFavorit);
router.post('/hapus-favorit', authController.hapusFavorit);
// Favorit
// media

router.get('/cerita/detail/:id_cerita', authController.getAllCeritaWithDetails);


module.exports = router;
