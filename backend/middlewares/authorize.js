// middlewares/authorize.js

function authorize(allowedRoles = []) {
  if (typeof allowedRoles === 'string') {
    allowedRoles = [allowedRoles];
  }

  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(401).json({ message: 'Chưa xác thực hoặc thiếu vai trò' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    next();
  };
}

module.exports = authorize; // <-- BẮT BUỘC PHẢI EXPORT HÀM
