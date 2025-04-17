// import express from 'express';
// import bodyParser from 'body-parser';
// import bcrypt from 'bcrypt';
// import session from 'express-session';
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import cors from 'cors';
// import env from 'dotenv';
// import cookieParser from 'cookie-parser';
// import memorystore from 'memorystore';
// import { generateSixDigitOTP, sendOTP } from './SendOTP.js';
// import User from './models/User.js'; // MongoDB User model

// const MemoryStore = memorystore(session);
// const router = express.Router();
// const app = express();
// const saltRounds = 10;

// env.config();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173', // Ensure your frontend is running on this port
//   credentials: true,
// }));

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Session setup before initializing passport
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 86400000 }, // 1 day
//     store: new MemoryStore({ checkPeriod: 86400000 }), // Periodic cleanup of expired sessions
//   })
// );

// // Passport middleware setup
// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ Passport Local Strategy
// passport.use(new LocalStrategy(
//   { usernameField: 'email', passwordField: 'password' },
//   async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return done(null, false, { message: 'Incorrect email.' });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// // ✅ Passport session support (serializing and deserializing the user)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// // Routes

// // Register route (user signup)
// router.post('/register', async (req, res) => {
//   const { name, email, password, type } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).send('User already exists');

//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       type,
//       isverified: false,
//     });

//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error registering user');
//   }
// });

// // Login route
// router.post('/login', (req, res, next) => {
//   if (req.body.email === process.env.ADMIN_MAIL && req.body.password === process.env.ADMIN_PASS) {
//     return res.status(200).json({ type: "admin" });
//   }

//   passport.authenticate('local', (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).send('Invalid credentials');
//     if (!user.isverified) return res.status(402).send("Not Verified");

//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       req.session.userId = user._id;
//       return res.status(200).json({ type: "user" });
//     });
//   })(req, res, next);
// });

// // OTP Send route
// router.post('/sendOTP', async (req, res) => {
//   try {
//     const { email, subject } = req.body;
//     const otp = generateSixDigitOTP();
//     await sendOTP(email, otp, subject);

//     const user = await User.findOneAndUpdate({ email }, { otp });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "Email not found" });
//     }

//     res.status(200).json({ success: true, message: "OTP Sent" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to send OTP" });
//   }
// });

// // OTP Verification route
// router.post('/verifyOTP', async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ success: false, message: "Email not found" });

//     if (user.otp === otp) {
//       user.isverified = true;
//       await user.save();
//       return res.status(200).json({ success: true, message: "OTP Verified" });
//     } else {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to verify OTP" });
//   }
// });

// // Password Reset route
// router.post('/resetPassword', async (req, res) => {
//   const { email, newPassword } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
//     const user = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });

//     if (!user) return res.status(404).send("User not found");

//     res.status(201).send(user);
//   } catch (err) {
//     res.status(500).send(`Error Resetting Password: ${err.message}`);
//   }
// });

// Check login status route
router.get('/login/status', (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// // Get user type route
// router.get('/user-type', (req, res) => {
//   return req.user ? res.send(req.user) : res.sendStatus(401);
// });

// // Logout route
// router.post('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) return res.sendStatus(500);
//     res.sendStatus(200);
//   });
// });

// export default router;
import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.js';
import { generateSixDigitOTP, sendOTP } from './SendOTP.js';

const router = express.Router();
const saltRounds = 10;

// -------------------- Passport Local Strategy --------------------
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.password) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      if (typeof password !== 'string' || typeof user.password !== 'string') {
        return done(null, false, { message: 'Invalid credentials.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// -------------------- Passport Session Handling --------------------
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// -------------------- Register --------------------
router.post('/register', async (req, res) => {
  const { name, email, password, type } = req.body;

  if (!password || password.trim() === '') {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      type,
      isverified: false,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// -------------------- Login --------------------
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Admin login check
  if (email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASS) {
    return res.status(200).json({ type: "admin" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (!user.isverified) return res.status(402).json({ message: 'Account not verified' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.userId = user._id;
      return res.status(200).json({ type: "user", message: "Login successful" });
    });
  })(req, res, next);
});


router.get('/login/status', (req, res) => {
    return req.user ? res.send(req.user) : res.sendStatus(401);
  });

// -------------------- Send OTP --------------------
router.post('/sendOTP', async (req, res) => {
  try {
    const { email, subject } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Email not found" });

    const otp = generateSixDigitOTP();
    await sendOTP(email, otp, subject);

    user.otp = otp;
    await user.save();

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// -------------------- Verify OTP --------------------
router.post('/verifyOTP', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Email not found" });

    if (user.otp === otp) {
      user.isverified = true;
      user.otp = null; // clear the OTP after verification
      await user.save();

      return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

export default router;
