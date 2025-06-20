const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const otpController = require('../controllers/otpController');
const { verifyToken, hasRole } = require('../middlewares/auth');
const authenticate = require('../middlewares/authenticate'); // <-- ✅ Đừng quên dòng này
const adminRoutes = require('./adminRoutes');
const authorize = require('../middlewares/authorize'); // ✅ Đường dẫn đúng
require('../models/User'); // đường dẫn tới model User

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/send-otp', otpController.sendOTP);
router.post('/verify-otp', otpController.verifyOTP);
router.use(authenticate); 
router.use('/admin', authorize('admin'), adminRoutes); 
// Route thử quyền admin
router.get('/admin', verifyToken, hasRole('admin'), (req, res) => {
  res.json({ msg: 'Hello Admin!' });
});
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Sau khi xác thực thành công, tạo JWT và trả về frontend hoặc redirect
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Ví dụ redirect kèm token trong query string
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);
router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);
module.exports = router;

