// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   type: String,
//   otp: String,
//   isverified: { type: Boolean, default: false },
// });

// // ✅ Prevent OverwriteModelError
// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: String,
  otp: String,
  isverified: { type: Boolean, default: false },
  googleId: { type: String, default: null }, // 👈 Add this
});

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
