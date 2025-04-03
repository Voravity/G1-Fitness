import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

import authRoutes from "./auth/authRoutes.js";

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
app.use("/auth", authRoutes);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Checks if theres a user logged in
app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// Logs user out
app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
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

// Route to save workouts
app.post("/api/workouts", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const { name, exercises } = req.body;
  if (!name || !Array.isArray(exercises)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const insertWorkout = db.prepare(`
    INSERT INTO workouts (name, user_id)
    VALUES (?, ?)
  `);
  const workoutResult = insertWorkout.run(name, user.id, createdAt);
  const workoutId = workoutResult.lastInsertRowid;

  const insertExercise = db.prepare(`
    INSERT INTO workout_exercises (workout_id, exercise_name)
    VALUES (?, ?)
  `);

  for (const exercise of exercises) {
    insertExercise.run(workoutId, exercise);
  }

  res.json({ message: "Workout saved", workoutId });
});


//  START SERVER 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});