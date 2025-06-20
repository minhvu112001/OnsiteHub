const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const passport = require('./passport');
const authenticate = require('./middlewares/authenticate');
const authorize = require('./middlewares/authorize');
const adminRoutes = require('./routes/adminRoutes'); 
require('./models/User');
dotenv.config();
const app = express();
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.send('Logged in as ' + req.user.displayName);
  }
);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

app.use(express.json());
app.use(passport.initialize());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use(express.json());

// Áp dụng xác thực cho tất cả route bên dưới
app.use(authenticate);

// Phân quyền và gắn route admin
app.use('/admin', authorize('admin'), adminRoutes);

// Route public (không cần xác thực)
app.get('/ping', (req, res) => res.send('pong'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
