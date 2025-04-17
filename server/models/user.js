import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: String,
  otp: String,
  isverified: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);
