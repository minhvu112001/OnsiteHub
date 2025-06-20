// middlewares/authenticate.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  // Kiểm tra header Authorization có tồn tại không
  if (!authHeader) {
    return res.status(401).json({ message: 'Thiếu token' });
  }

  // Kiểm tra định dạng: Bearer <token>
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Sai định dạng token (phải là Bearer <token>)' });
  }

  const token = authHeader.split(' ')[1]; // Lấy phần sau "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gán user từ token vào request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

module.exports = authenticate;
