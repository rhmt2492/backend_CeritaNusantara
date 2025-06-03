// const bcrypt = require('bcrypt');
// const db = require('../db'); 

// // Fungsi untuk handle register
// exports.register = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Simpan user baru ke database dengan email
//     db.query(
//       'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//       [username, email, hashedPassword],
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ message: 'Gagal registrasi', error: err });
//         }
//         res.status(201).json({ message: 'Registrasi berhasil' });
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ message: 'Terjadi kesalahan server' });
//   }
// };


// // Fungsi untuk handle login
// const jwt = require('jsonwebtoken');

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email dan password wajib diisi' });
//   }

//   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: 'Query error', error: err });

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Email tidak ditemukan' });
//     }

//     const user = results[0];
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(401).json({ message: 'Password salah' });
//     }

//     // Buat token JWT
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({ message: 'Login berhasil', token });
//   });
// };

// // Lupa Password
// const crypto = require('crypto');


// // 1. FORGOT PASSWORD - Kirim Token ke Email
// exports.forgotPassword = (req, res) => {
//   const { email } = req.body;

//   db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error saat mencari email', error: err });

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Email tidak ditemukan' });
//     }

//     const user_id = results[0].id;
//     const token = crypto.randomBytes(32).toString('hex');
//     const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

//     db.query(
//       'INSERT INTO lupa_password (user_id, token, expires_at, created_at) VALUES (?, ?, ?, NOW())',
//       [user_id, token, expires_at],
//       (err) => {
//         if (err) return res.status(500).json({ message: 'Gagal simpan token', error: err });

//         // 👉 Kirim token ke email di tahap berikutnya (atau tampilkan untuk testing)
//         return res.status(200).json({
//           message: 'Token reset password dibuat. (testing: token ditampilkan)',
//           token,
//           user_id
//         });
//       }
//     );
//   });
// };

// // 2. RESET PASSWORD - Gunakan token untuk ubah password
// exports.resetPassword = async (req, res) => {
//   const { token, password } = req.body;

//   db.query(
//     'SELECT * FROM lupa_password WHERE token = ? AND expires_at > NOW()',
//     [token],
//     async (err, results) => {
//       if (err) return res.status(500).json({ message: 'Token error', error: err });

//       if (results.length === 0) {
//         return res.status(400).json({ message: 'Token tidak valid atau telah kadaluarsa' });
//       }

//       const user_id = results[0].user_id;
//       const hashedPassword = await bcrypt.hash(password, 10);

//       db.query(
//         'UPDATE users SET password = ? WHERE id = ?',
//         [hashedPassword, user_id],
//         (err2) => {
//           if (err2) return res.status(500).json({ message: 'Gagal update password', error: err2 });

//           // Hapus token setelah digunakan
//           db.query('DELETE FROM lupa_password WHERE token = ?', [token]);
//           return res.status(200).json({ message: 'Password berhasil diubah' });
//         }
//       );
//     }
//   );
// };

// // Lupa Password


// // fungsi untuk detail users
// // GET
// exports.getDetailUser = (req, res) => {
//   const user_id = req.params.user_id;

//   db.query('SELECT * FROM detail_users WHERE user_id = ?', [user_id], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Gagal mengambil detail user', error: err });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Detail user tidak ditemukan' });
//     }

//     res.status(200).json({ data: results[0] });
//   });
// };


// // POST
// exports.createDetailUser = (req, res) => {
//   const {
//     user_id,
//     nama_lengkap,
//     photo_profile,
//     no_telepon,
//     alamat,
//     tanggal_lahir,
//     jenis_kelamin,
//     status_aktif
//   } = req.body;

//   const query = `
//     INSERT INTO detail_users (
//       user_id, nama_lengkap, photo_profile, no_telepon,
//       alamat, tanggal_lahir, jenis_kelamin, status_aktif, updated_at
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
//     ON DUPLICATE KEY UPDATE
//       nama_lengkap = VALUES(nama_lengkap),
//       photo_profile = VALUES(photo_profile),
//       no_telepon = VALUES(no_telepon),
//       alamat = VALUES(alamat),
//       tanggal_lahir = VALUES(tanggal_lahir),
//       jenis_kelamin = VALUES(jenis_kelamin),
//       status_aktif = VALUES(status_aktif),
//       updated_at = NOW()
//   `;

//   db.query(
//     query,
//     [
//       user_id,
//       nama_lengkap,
//       photo_profile,
//       no_telepon,
//       alamat,
//       tanggal_lahir,
//       jenis_kelamin,
//       status_aktif
//     ],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Gagal menyimpan detail user', error: err });
//       }
//       res.status(200).json({ message: 'Detail user berhasil disimpan/diupdate' });
//     }
//   );
// };

// // PUT
// exports.updateDetailUser = (req, res) => {
//   const user_id = req.params.user_id;
//   const {
//     nama_lengkap,
//     photo_profile,
//     no_telepon,
//     alamat,
//     tanggal_lahir,
//     jenis_kelamin,
//     status_aktif
//   } = req.body;

//   const query = `
//     UPDATE detail_users SET
//       nama_lengkap = ?,
//       photo_profile = ?,
//       no_telepon = ?,
//       alamat = ?,
//       tanggal_lahir = ?,
//       jenis_kelamin = ?,
//       status_aktif = ?,
//       updated_at = NOW()
//     WHERE user_id = ?
//   `;

//   db.query(
//     query,
//     [
//       nama_lengkap,
//       photo_profile,
//       no_telepon,
//       alamat,
//       tanggal_lahir,
//       jenis_kelamin,
//       status_aktif,
//       user_id
//     ],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Gagal update detail user', error: err });
//       }

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'User tidak ditemukan untuk diupdate' });
//       }

//       res.status(200).json({ message: 'Detail user berhasil diupdate' });
//     }
//   );
// };

// // fungsi untuk detail users




const bcrypt = require('bcrypt');
const db = require('../db');  
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Konfigurasi nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // email pengirim
    pass: process.env.EMAIL_PASS    // app password email
  }
});

// REGISTER
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Gagal registrasi', error: err });
        }
        res.status(201).json({ message: 'Registrasi berhasil' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Query error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login berhasil', token });
  });
};

// FORGOT PASSWORD - Kirim Token ke Email
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error saat mencari email', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    const user_id = results[0].id;
    const token = crypto.randomBytes(32).toString('hex');
    const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

    db.query(
      'INSERT INTO lupa_password (user_id, token, expires_at, created_at) VALUES (?, ?, ?, NOW())',
      [user_id, token, expires_at],
      (err) => {
        if (err) return res.status(500).json({ message: 'Gagal simpan token', error: err });

        // Siapkan isi email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Reset Password - Token',
          text: `Halo,\n\nGunakan token berikut untuk reset password kamu:\n\n${token}\n\nToken ini berlaku selama 15 menit.\n\nTerima kasih.`
        };

        // Kirim email token
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error kirim email:', error);
            return res.status(500).json({ message: 'Gagal kirim email token', error });
          } else {
            console.log('Email terkirim:', info.response);
            return res.status(200).json({
              message: 'Token reset password telah dikirim ke email',
              user_id
            });
          }
        });
      }
    );
  });
};

// RESET PASSWORD - Gunakan token untuk ubah password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  db.query(
    'SELECT * FROM lupa_password WHERE token = ? AND expires_at > NOW()',
    [token],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Token error', error: err });

      if (results.length === 0) {
        return res.status(400).json({ message: 'Token tidak valid atau telah kadaluarsa' });
      }

      const user_id = results[0].user_id;
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, user_id],
        (err2) => {
          if (err2) return res.status(500).json({ message: 'Gagal update password', error: err2 });

          // Hapus token setelah digunakan
          db.query('DELETE FROM lupa_password WHERE token = ?', [token]);
          return res.status(200).json({ message: 'Password berhasil diubah' });
        }
      );
    }
  );
};

// GET DETAIL USER
exports.getDetailUser = (req, res) => {
  const user_id = req.params.user_id;

  db.query('SELECT * FROM detail_users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal mengambil detail user', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Detail user tidak ditemukan' });
    }

    res.status(200).json({ data: results[0] });
  });
};

// CREATE / UPDATE DETAIL USER
exports.createDetailUser = (req, res) => {
  const {
    user_id,
    nama_lengkap,
    photo_profile,
    no_telepon,
    alamat,
    tanggal_lahir,
    jenis_kelamin,
    status_aktif
  } = req.body;

  const query = `
    INSERT INTO detail_users (
      user_id, nama_lengkap, photo_profile, no_telepon,
      alamat, tanggal_lahir, jenis_kelamin, status_aktif, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      nama_lengkap = VALUES(nama_lengkap),
      photo_profile = VALUES(photo_profile),
      no_telepon = VALUES(no_telepon),
      alamat = VALUES(alamat),
      tanggal_lahir = VALUES(tanggal_lahir),
      jenis_kelamin = VALUES(jenis_kelamin),
      status_aktif = VALUES(status_aktif),
      updated_at = NOW()
  `;

  db.query(
    query,
    [
      user_id,
      nama_lengkap,
      photo_profile,
      no_telepon,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      status_aktif
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal menyimpan detail user', error: err });
      }
      res.status(200).json({ message: 'Detail user berhasil disimpan/diupdate' });
    }
  );
};

// UPDATE DETAIL USER
exports.updateDetailUser = (req, res) => {
  const user_id = req.params.user_id;
  const {
    nama_lengkap,
    photo_profile,
    no_telepon,
    alamat,
    tanggal_lahir,
    jenis_kelamin,
    status_aktif
  } = req.body;

  const query = `
    UPDATE detail_users SET
      nama_lengkap = ?,
      photo_profile = ?,
      no_telepon = ?,
      alamat = ?,
      tanggal_lahir = ?,
      jenis_kelamin = ?,
      status_aktif = ?,
      updated_at = NOW()
    WHERE user_id = ?
  `;

  db.query(
    query,
    [
      nama_lengkap,
      photo_profile,
      no_telepon,
      alamat,
      tanggal_lahir,
      jenis_kelamin,
      status_aktif,
      user_id
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal update detail user', error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User tidak ditemukan untuk diupdate' });
      }

      res.status(200).json({ message: 'Detail user berhasil diupdate' });
    }
  );
};


// Tambah Cerita
exports.tambahCerita = (req, res) => {
  const { user_id, judul, deskripsi, lokasi } = req.body;
  const img = req.file ? req.file.filename : null;
  const status = 'waiting';

  const query = `
    INSERT INTO tambah_cerita (user_id, img, lokasi, judul, deskripsi, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, img, lokasi, judul, deskripsi, status], (err, result) => {
    if (err) {
      console.error('Error saat insert cerita:', err);
      return res.status(500).json({ message: 'Gagal menambah cerita', error: err });
    }

    const idCeritaBaru = result.insertId;

    // Tambahkan ke waiting_list setelah berhasil tambah_cerita
    const waitingQuery = `INSERT INTO waiting_list (id_cerita) VALUES (?)`;
    db.query(waitingQuery, [idCeritaBaru], (err2) => {
      if (err2) {
        console.error('Gagal insert ke waiting_list:', err2);
        return res.status(500).json({ message: 'Cerita ditambah, tapi gagal masuk waiting list', error: err2 });
      }

      // Semua sukses
      res.status(201).json({
        message: 'Cerita berhasil ditambahkan & masuk waiting list',
        data: {
          id_cerita: idCeritaBaru,
          user_id,
          img,
          lokasi,
          judul,
          deskripsi,
          status: 'waiting'
        }
      });
    });
  });
};




exports.updateStatusCerita = (req, res) => {
  const { status, alasan, analisis_emotional, summarize } = req.body;
  const { id } = req.params;

  // Update status cerita
  const updateQuery = `UPDATE tambah_cerita SET status = ? WHERE id_cerita = ?`;

  db.query(updateQuery, [status, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal update status', error: err });

    // Jika status diterima (approved), simpan analisis sentiment dan ringkasan
    if (status === 'approved') {
      const accQuery = `INSERT INTO acc_list (id_cerita, analisis_emotional_cerita, summarize) VALUES (?, ?, ?)`;
      db.query(accQuery, [id, analisis_emotional || '', summarize || ''], (err2) => {
        if (err2) {
          console.error('Gagal insert ke acc_list:', err2);
          // Meskipun gagal simpan acc_list, tetap lanjutkan response
        }
      });
    }
    // Jika status ditolak, simpan alasan ke reject_list
    else if (status === 'rejected') {
      const rejectQuery = `INSERT INTO reject_list (id_cerita, alasan) VALUES (?, ?)`;
      db.query(rejectQuery, [id, alasan || 'Tidak ada alasan'], (err3) => {
        if (err3) {
          console.error('Gagal insert ke reject_list:', err3);
        }
      });
    }

    // Hapus cerita dari waiting_list karena sudah diproses
    db.query(`DELETE FROM waiting_list WHERE id_cerita = ?`, [id], (err4) => {
      if (err4) {
        console.error('Gagal hapus dari waiting_list:', err4);
      }
    });

    res.status(200).json({ message: `Status cerita #${id} berhasil diubah ke '${status}'` });
  });
};



// Tambah Cerita

// waiting list
exports.tambahKeWaitingList = (req, res) => {
  const { id_cerita } = req.body;
  const query = 'INSERT INTO waiting_list (id_cerita) VALUES (?)';
  db.query(query, [id_cerita], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal', error: err });
    res.status(201).json({ message: 'Masuk ke waiting list', data: { id_cerita } });
  });
};
// waiting list


exports.getWaitingListWithCerita = (req, res) => {
  const query = `
    SELECT w.id_cerita, t.judul, t.deskripsi, w.sentiment
    FROM waiting_list w
    JOIN tambah_cerita t ON w.id_cerita = t.id_cerita
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data waiting list', error: err });

    res.status(200).json({
      message: 'Berhasil mengambil data waiting list',
      data: results
    });
  });
};



// Simpan hasil analisis ke waiting_list
exports.simpanAnalisisCerita = (req, res) => {
  const { id_cerita, sentiment } = req.body;

  const query = `
    UPDATE waiting_list 
    SET sentiment = ?
    WHERE id_cerita = ?
  `;

  db.query(query, [sentiment, id_cerita], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menyimpan analisis', error: err });

    res.status(200).json({ message: 'Analisis berhasil disimpan', data: { id_cerita, sentiment } });
  });
};


// MEDIA
exports.likeCerita = (req, res) => {
  const { user_id, cerita_id } = req.body; // sesuaikan dengan JSON input

  if (!user_id || !cerita_id) {
    return res.status(400).json({ message: 'user_id dan cerita_id wajib diisi' });
  }

  const checkQuery = 'SELECT * FROM like_cerita WHERE id_user = ? AND id_cerita = ?';
  db.query(checkQuery, [user_id, cerita_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal memeriksa like', error: err });

    if (results.length > 0) {
      return res.status(400).json({ message: 'Cerita sudah di-like oleh user ini' });
    }

    const insertQuery = 'INSERT INTO like_cerita (id_user, id_cerita, created_at) VALUES (?, ?, NOW())';
    db.query(insertQuery, [user_id, cerita_id], (err2) => {
      if (err2) return res.status(500).json({ message: 'Gagal menambahkan like', error: err2 });

      res.status(201).json({ message: 'Berhasil menambahkan like' });
    });
  });
};

exports.unlikeCerita = (req, res) => {
  const { user_id, cerita_id } = req.body;

  if (!user_id || !cerita_id) {
    return res.status(400).json({ message: 'user_id dan cerita_id wajib diisi' });
  }

  const deleteQuery = 'DELETE FROM like_cerita WHERE id_user = ? AND id_cerita = ?';
  db.query(deleteQuery, [user_id, cerita_id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus like', error: err });

    res.status(200).json({ message: 'Berhasil menghapus like' });
  });
};


// Tambah Komentar
exports.tambahKomentar = (req, res) => {
  const { user_id, cerita_id, isi_komentar } = req.body; // sesuaikan nama properti

  if (!user_id || !cerita_id || !isi_komentar) {
    return res.status(400).json({ message: 'user_id, cerita_id, dan isi_komentar wajib diisi' });
  }

  const insertQuery = 'INSERT INTO komentar (id_user, id_cerita, isi_komentar, tanggal) VALUES (?, ?, ?, NOW())';
  db.query(insertQuery, [user_id, cerita_id, isi_komentar], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan komentar', error: err });

    res.status(201).json({ message: 'Berhasil menambahkan komentar' });
  });
};

// Ambil Komentar berdasarkan id_cerita
exports.getKomentarByCerita = (req, res) => {
  const { id_cerita } = req.params;

  if (!id_cerita) {
    return res.status(400).json({ message: 'id_cerita wajib diisi' });
  }

  const selectQuery = `
    SELECT k.id, k.isi_komentar, k.tanggal, u.username
    FROM komentar k
    JOIN users u ON k.id_user = u.id
    WHERE k.id_cerita = ?
    ORDER BY k.tanggal ASC
  `;
  db.query(selectQuery, [id_cerita], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil komentar', error: err });

    res.status(200).json({ data: results });
  });
};



// Tambah ke Favorit
exports.tambahFavorit = (req, res) => {
  const { user_id, cerita_id } = req.body; // perbaiki jadi cerita_id agar konsisten

  // Validasi
  if (!user_id || !cerita_id) {
    return res.status(400).json({ message: 'user_id dan cerita_id wajib diisi' });
  }

  const checkQuery = 'SELECT * FROM favorit_cerita WHERE id_user = ? AND id_cerita = ?';
  db.query(checkQuery, [user_id, cerita_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal memeriksa favorit', error: err });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Cerita sudah ada di favorit' });
    }

    const insertQuery = 'INSERT INTO favorit_cerita (id_user, id_cerita, created_at) VALUES (?, ?, NOW())';
    db.query(insertQuery, [user_id, cerita_id], (err2) => {
      if (err2) {
        return res.status(500).json({ message: 'Gagal menambahkan ke favorit', error: err2 });
      }

      res.status(201).json({ message: 'Berhasil menambahkan ke favorit' });
    });
  });
};

// Hapus dari Favorit
exports.hapusFavorit = (req, res) => {
  const { user_id, cerita_id } = req.body;

  if (!user_id || !cerita_id) {
    return res.status(400).json({ message: 'user_id dan cerita_id wajib diisi' });
  }

  const deleteQuery = 'DELETE FROM favorit_cerita WHERE id_user = ? AND id_cerita = ?';
  db.query(deleteQuery, [user_id, cerita_id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal menghapus dari favorit', error: err });
    }

    res.status(200).json({ message: 'Berhasil menghapus dari favorit' });
  });
};

// MEDIA


// GET /cerita/detail/:id_cerita?user_id=5
exports.getAllCeritaWithDetails = (req, res) => {
  const id_cerita = req.params.id_cerita;
  const user_id = req.query.user_id || null;

  if (!id_cerita) {
    return res.status(400).json({ message: 'Parameter id_cerita wajib diisi' });
  }

  const ceritaQuery = `
    SELECT c.id_cerita AS id, c.judul, c.deskripsi AS isi, c.img AS gambar, c.lokasi, u.username AS nama_user
    FROM tambah_cerita c
    JOIN users u ON c.user_id = u.id
    WHERE c.id_cerita = ?
  `;

  const komentarQuery = `
    SELECT k.id AS id_komentar, k.isi_komentar, k.tanggal, u.username
    FROM komentar k
    JOIN users u ON k.id_user = u.id
    WHERE k.id_cerita = ?
    ORDER BY k.tanggal ASC
  `;

  const likeQueryWithUser = `
    SELECT COUNT(*) AS total_like,
           SUM(CASE WHEN id_user = ? THEN 1 ELSE 0 END) AS user_like
    FROM like_cerita
    WHERE id_cerita = ?
  `;

  const likeQueryWithoutUser = `
    SELECT COUNT(*) AS total_like
    FROM like_cerita
    WHERE id_cerita = ?
  `;

  const favoritQueryWithUser = `
    SELECT COUNT(*) AS total_favorit,
           SUM(CASE WHEN id_user = ? THEN 1 ELSE 0 END) AS user_favorit
    FROM favorit_cerita
    WHERE id_cerita = ?
  `;

  const favoritQueryWithoutUser = `
    SELECT COUNT(*) AS total_favorit
    FROM favorit_cerita
    WHERE id_cerita = ?
  `;

  db.query(ceritaQuery, [id_cerita], (err1, ceritaResult) => {
    if (err1) {
      return res.status(500).json({ message: 'Gagal mengambil data cerita', error: err1 });
    }
    if (ceritaResult.length === 0) {
      return res.status(404).json({ message: 'Cerita tidak ditemukan' });
    }

    db.query(komentarQuery, [id_cerita], (err2, komentarResult) => {
      if (err2) {
        return res.status(500).json({ message: 'Gagal mengambil komentar', error: err2 });
      }

      const likeQuery = user_id ? likeQueryWithUser : likeQueryWithoutUser;
      const likeParams = user_id ? [user_id, id_cerita] : [id_cerita];

      db.query(likeQuery, likeParams, (err3, likeResult) => {
        if (err3) {
          return res.status(500).json({ message: 'Gagal mengambil like', error: err3 });
        }

        const favoritQuery = user_id ? favoritQueryWithUser : favoritQueryWithoutUser;
        const favoritParams = user_id ? [user_id, id_cerita] : [id_cerita];

        db.query(favoritQuery, favoritParams, (err4, favoritResult) => {
          if (err4) {
            return res.status(500).json({ message: 'Gagal mengambil favorit', error: err4 });
          }

          const totalLike = likeResult[0]?.total_like ?? 0;
          const userLike = user_id ? (likeResult[0]?.user_like ?? 0) > 0 : false;

          const totalFavorit = favoritResult[0]?.total_favorit ?? 0;
          const userFavorit = user_id ? (favoritResult[0]?.user_favorit ?? 0) > 0 : false;

          const detail = {
            ...ceritaResult[0],
            komentar: komentarResult,
            like: {
              total: totalLike,
              sudahDilikeUser: userLike
            },
            favorit: {
              total: totalFavorit,
              sudahDifavoritkanUser: userFavorit
            }
          };

          return res.status(200).json({ data: detail });
        });
      });
    });
  });
};

// // PUT /cerita/:id/status
// exports.updateStatusCerita = (req, res) => {
//   const { status, alasan, analisis_emotional, summarize } = req.body;
//   const { id } = req.params;

//   const updateQuery = `UPDATE tambah_cerita SET status = ? WHERE id_cerita = ?`;

//   db.query(updateQuery, [status, id], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Gagal update status', error: err });

//     if (status === 'approved') {
//       const accQuery = `INSERT INTO acc_list (id_cerita, analisis_emotional_cerita, summarize) VALUES (?, ?, ?)`;
//       db.query(accQuery, [id, analisis_emotional || '', summarize || '']);
//     } else if (status === 'rejected') {
//       const rejectQuery = `INSERT INTO reject_list (id_cerita, alasan) VALUES (?, ?)`;
//       db.query(rejectQuery, [id, alasan || 'Tidak ada alasan']);
//     }

//     // (Opsional) Hapus dari waiting_list
//     db.query(`DELETE FROM waiting_list WHERE id_cerita = ?`, [id]);

//     res.status(200).json({ message: `Status cerita #${id} berhasil diubah ke '${status}'` });
//   });
// };