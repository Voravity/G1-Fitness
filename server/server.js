import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";

import db from "./db/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//// MIDDLEWARE 
app.use(cors({ origin: "http://localhost:5173", credentials: true })); 
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//// PASSPORT CONFIG: probably move to a "config" folder later
// google passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
  const id = profile.id;
  const provider = "google";
  const displayName = profile.displayName;
  const email = profile.emails?.[0]?.value;

  // Insert or ignore if already exists
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (id, provider, display_name, email)
    VALUES (?, ?, ?, ?)
  `);

  return done(null, profile);
}));

// facebook passport
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails'] 
}, (accessToken, refreshToken, profile, done) => {
  const id = profile.id;
  const provider = "facebook";
  const displayName = profile.displayName;
  const email = profile.emails?.[0]?.value;

  // Insert or ignore if already exists
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (id, provider, display_name, email)
    VALUES (?, ?, ?, ?)
  `);

  return done(null, profile);
}));

// github passport
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback",
}, (accessToken, refreshToken, profile, done) => {
    
  const id = profile.id;
  const provider = "github";
  const displayName = profile.displayName;
  const email = profile.emails?.[0]?.value;

  // Insert or ignore if already exists
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (id, provider, display_name, email)
    VALUES (?, ?, ?, ?)
  `);

  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});



//// ROUTES: probably moved into "routes" folder later
// google route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", {failureRedirect: "http://localhost:5173/login"}),

  /* 
    Send a small html snippet as a response to a successful callback.
    It sends it to the window.opener in the frontend login page which follows the html instructions.
  */
  (req, res) => {
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage("oauth-success", "*");
            window.close();
          </script>
        </body>
      </html>
    `);
  }
);

// facebook route
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", {failureRedirect: "http://localhost:5173/login"}),
  /* 
    Send a small html snippet as a response to a successful callback.
    It sends it to the window.opener in the frontend login page which follows the html instructions.
  */
    (req, res) => {
      res.send(`
        <html>
          <body>
            <script>
              window.opener.postMessage("oauth-success", "*");
              window.close();
            </script>
          </body>
        </html>
      `);
    }
);

// github route
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get("/auth/github/callback",
  passport.authenticate("github", {failureRedirect: "http://localhost:5173/login"}),
  
  /* 
    Send a small html snippet as a response to a successful callback.
    It sends it to the window.opener in the frontend login page which follows the html instructions.
  */
    (req, res) => {
      res.send(`
        <html>
          <body>
            <script>
              window.opener.postMessage("oauth-success", "*");
              window.close();
            </script>
          </body>
        </html>
      `);
    }
);

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

// Route to get exercises
app.get("/api/exercises", (req, res) => {
  const groups = db.prepare(`
    SELECT id, category, subcategory FROM muscle_groups
  `).all();

  const exercises = db.prepare(`
    SELECT id, name, muscle_group_id FROM exercises
  `).all();

  const grouped = {};

  for (const group of groups) {
    const { category, subcategory, id } = group;
    if (!grouped[category]) {
      grouped[category] = {};
    }
    grouped[category][subcategory] = exercises
      .filter((e) => e.muscle_group_id === id)
      .map((e) => e.name);
  }

  res.json(grouped);
});


// Checks if theres a user logged in
app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

//  START SERVER 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});