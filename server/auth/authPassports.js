
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import db from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

// Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
  const id = profile.id;
  const provider = "google";
  const displayName = profile.displayName;
  const email = profile.emails?.[0]?.value;

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (id, provider, display_name, email)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, provider, displayName, email);

  return done(null, profile);
}));

// GitHub
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback",
}, (accessToken, refreshToken, profile, done) => {
  const id = profile.id;
  const provider = "github";
  const displayName = profile.displayName;
  const email = profile.emails?.[0]?.value;

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (id, provider, display_name, email)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, provider, displayName, email);

  return done(null, profile);
}));

// Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ["id", "displayName", "emails"],
}, (accessToken, refreshToken, profile, done) => {
  const id = profile.id;
  const provider = "facebook";
  const displayName = profile.displayName;
  const email = profile.emails?.[0]?.value;

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (id, provider, display_name, email)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, provider, displayName, email);

  return done(null, profile);
}));

// Session handlers
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;