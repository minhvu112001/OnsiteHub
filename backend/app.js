const express = require('express');
const cors = require('cors');
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
const authorize = require('./middlewares/authorize'); // ✅ đúng đường dẫn
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middlewares/authenticate');
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
// Áp dụng xác thực trước
router.use(authenticate); // ✅ Bây giờ dòng này không lỗi nữa

// Áp dụng phân quyền theo vai trò admin cho nhóm route
router.use('/admin', authorize('admin'), adminRoutes); // ✅ Gọi đúng dạng
module.exports = router;
module.exports = app;
// app.js hoặc routes/auth.js
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // TODO: xử lý xác thực
  if (username === 'admin' && password === '123456') {
    return res.json({ message: 'Login thành công' });
  }

  res.status(401).json({ error: 'Sai thông tin đăng nhập' });
});