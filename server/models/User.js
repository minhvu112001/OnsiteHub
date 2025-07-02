import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['candidate', 'employer', 'admin'], default: 'candidate' },
  email: { type: String, required: true, unique: true },
  password: String,
  fullName: String,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
