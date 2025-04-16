import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  google_id: { type: String, required: false },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  otp: { type: String, default: '000000' },
  otp_timestamp: { type: Number, required: false },
  isVerified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
