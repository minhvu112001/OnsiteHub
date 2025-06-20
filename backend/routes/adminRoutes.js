// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  // Trả về danh sách người dùng (chỉ admin truy cập được)
  res.json({ message: 'Danh sách người dùng chỉ dành cho admin' });
});

router.patch('/jobs/:id/review', (req, res) => {
  res.json({ message: `Duyệt bài đăng ${req.params.id}` });
});

module.exports = router;
