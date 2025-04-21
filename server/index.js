// // import axios from 'axios';
// import express from "express";
// import bodyParser from "body-parser";
// import connectDB from './db.js'; 
// import bcrypt from "bcrypt";
// import session from "express-session";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import householdRouter from "./householdData.js";
// import { contactUsRouter } from "./contactus.js";  // Named import

// import authRouter from "./Authentication.js";
// import businessRouter from "./businessData.js";
// import adminRouter from "./adminData.js";
// import memorystore from 'memorystore';
// import path from "path";
// import User from './models/User.js'; // MongoDB User mode
// const MemoryStore = memorystore(session);
// const app = express();
// const port = process.env.PORT || 3001;


// // Enable CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend origin
//     credentials: true,
//   })
// );

// app.use(cookieParser()); // Add cookie-parser middleware

// // // Middleware setup
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 86400000 },
//     store: new MemoryStore({
//       checkPeriod: 86400000 // prune expired entries every 24h
//     }),
//   })
// );

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(passport.initialize());
// app.use(passport.session());


// // MongoDB connection
// connectDB();


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback', // Relative path works well behind proxy or localhost
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });

//     if (!user) {
//       user = await User.create({
//         googleId: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         isverified: true,
//         type: 'user',
//       });
//     }

//     return done(null, user);
//   } catch (err) {
//     return done(err, null);
//   }
// }));


// // Initiate Google OAuth
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google OAuth callback
// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: 'http://localhost:5173/login',
//     session: true,
//   }),
//   (req, res) => {
//     // Redirect to frontend after successful login
//     res.redirect('http://localhost:5173/dashboard'); // adjust as needed
//   }
// );


// // async function findOrCreateUser(googleId, profile) {
// //   try {
 
// //     let result = await db.query("SELECT * FROM users WHERE google_id = $1", [googleId]);

// //     if (result.rows.length > 0) {
// //       return result.rows[0]; // User found
// //     } else {
// //       const defaultPassword = await bcrypt.hash('defaultpassword', 10); // Generate a hashed default password
// //       const newUser = await db.query(
// //         "INSERT INTO users (google_id, email, name, password, type, isVerified) VALUES ($1, $2, $3, $4, $5, true) RETURNING *",
// //         [googleId, profile.emails[0].value, profile.displayName, defaultPassword, 'user']
// //       );
// //       return newUser.rows[0]; // New user created
// //     }
// //   } catch (err) {
// //     throw new Error(`Error finding or creating user: ${err.message}`);
// //   }
// // }


// // passport.use(
// //   new GoogleStrategy({
// //     clientID: process.env.OAUTH_CLIENT_ID,
// //     clientSecret: process.env.OAUTH_SECRET,
// //     callbackURL: "https://prithwe.onrender.com/auth/google/prithwe",
// //     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
// //   },
// //   async function(accessToken, refreshToken, profile, cb) {
// //     try {
// //       const user = await findOrCreateUser(profile.id, profile);
// //       return cb(null, user); 
// //     } catch (err) {
// //       return cb(err);
// //     }
// //   }
// // ));



// // // app.get('/auth/google',
// // //   passport.authenticate('google', { scope: ['profile', 'email'] }));
// // app.get('/auth/google', async (req, res, next) => {
// //   const {userType} = req.query;
// //   res.cookie('userType', userType) 

// //   passport.authenticate('google', {
// //     scope: ['profile', 'email'],
// //   })(req, res, next);
 
// // });


// // app.get('/auth/google/prithwe', 
// //   passport.authenticate('google', { failureRedirect: '/login' }),
// //   async function (req, res) {
// //     let result = await db.query("UPDATE users SET type = $1 WHERE email = $2", [req.cookies.userType, req.user.email]);
// //     res.clearCookie('userType');
// //     res.redirect('https://prithwe.onrender.com'); // Adjust the redirect URL as needed
// //   });

// // Other routes

// app.use(express.json());
// app.use("/api/household", householdRouter);
// app.use("/api/contact", contactUsRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/business", businessRouter);
// app.use("/api/admin", adminRouter);

// app.listen(port, () => console.log("App is listening"));

// // const __dirname1 = path.resolve();

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname1, "client", "dist")));
// //   app.get("*", (_, res) => {
// //     res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
// //   });
// // } else {
// //   app.get("/", (_, res) => {
// //     res.send("App is under development!");
// //   });
// // }



// // const url = `https://prithwe.onrender.com/`; 
// // const interval = 800000; // Interval in milliseconds (8min)

// // function reloadWebsite() {
// //   axios.get(url)
// //     .then(response => {
// //       console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
// //     })
// //     .catch(error => {
// //       console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
// //     });
// // }


// // setInterval(reloadWebsite, interval);




import express from "express";
import bodyParser from "body-parser";
import connectDB from './db.js'; 
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import cors from "cors";
import cookieParser from "cookie-parser";
import memorystore from 'memorystore';
import householdRouter from "./householdData.js";
import { contactUsRouter } from "./contactus.js";
// import authRouter from "./Authentication.js";
import businessRouter from "./businessData.js";
import adminRouter from "./adminData.js";
import User from './models/User.js';

const MemoryStore = memorystore(session);
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 86400000 },
  store: new MemoryStore({ checkPeriod: 86400000 }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        isverified: true,
        type: 'user',
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: true,
  }),
  (req, res) => {
    res.redirect('http://localhost:5173/calculator'); // Adjust as needed
  }
);

// Routes
app.use("/api/household", householdRouter);
app.use("/api/contact", contactUsRouter);
// app.use("/api/auth", authRouter); //no need of this route as we are using firebase authentication
app.use("/api/business", businessRouter);
app.use("/api/admin", adminRouter);

// Dev route
app.get("/", (_, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




