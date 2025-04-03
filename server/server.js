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

// route to fetch exercises
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

// save workouts
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
  const workoutResult = insertWorkout.run(name, user.id);
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


// fetch saved routines for library
app.get("/api/user/workouts", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const workouts = db.prepare(`
    SELECT w.id, w.name, we.exercise_name 
    FROM workouts w
    LEFT JOIN workout_exercises we ON w.id = we.workout_id
    WHERE w.user_id = ?
  `).all(user.id);

  // group workouts and exercises
  const grouped = {};
  for (const { id, name, exercise_name } of workouts) {
    if (!grouped[id]) {
      grouped[id] = { name, exercises: [] };
    }
    grouped[id].exercises.push(exercise_name);
  }

  res.json(
    Object.entries(grouped).map(([id, { name, exercises }]) => ({
      id: Number(id),
      name,
      exercises,
    }))
  );
});


app.get("/api/journal", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const stmt = db.prepare(`
    SELECT je.id, je.entry_name, je.mood, je.date_created, w.name as routine_name
    FROM journal_entries je
    JOIN workouts w ON je.routine_id = w.id
    WHERE je.user_id = ?
    ORDER BY je.date_created DESC
  `);

  const entries = stmt.all(user.id);
  res.json(entries);
});



app.post("/api/journal", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const { routine_id, entry_name, mood, data } = req.body;

  const stmt = db.prepare(`
    INSERT INTO journal_entries (user_id, routine_id, entry_name, mood, date_created, data)
    VALUES (?, ?, ?, ?, datetime('now'), ?)
  `);
  stmt.run(user.id, routine_id, entry_name, mood, JSON.stringify(data));

  res.json({ message: "Journal entry saved!" });
});


// fetch existing journal entry by routine id, might be redundant, added this with following get when i was debugging
app.get("/api/journal/:routineId", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const routineId = req.params.routineId;

  const stmt = db.prepare(`
    SELECT id, entry_name, mood, data
    FROM journal_entries
    WHERE user_id = ? AND routine_id = ?
    ORDER BY date_created DESC
    LIMIT 1
  `);

  const entry = stmt.get(user.id, routineId);

  if (!entry) {
    return res.json({ entry: null });
  }

  res.json({
    entry: {
      id: entry.id,
      entry_name: entry.entry_name,
      mood: entry.mood,
      data: JSON.parse(entry.data),
    },
  });
});


// fetch journal entry by id
app.get("/api/journal/entry/:entryId", (req, res) => {
  const user = req.user;
  const { entryId } = req.params;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const stmt = db.prepare(`
    SELECT je.id, je.entry_name, je.mood, je.data, w.name AS routine_name
    FROM journal_entries je
    JOIN workouts w ON je.routine_id = w.id
    WHERE je.id = ? AND je.user_id = ?
  `);

  const entry = stmt.get(entryId, user.id);

  if (!entry) return res.status(404).json({ message: "Entry not found" });

  res.json({
    id: entry.id,
    entry_name: entry.entry_name,
    mood: entry.mood,
    data: JSON.parse(entry.data),
    routine_name: entry.routine_name,
  });
});



// update existing entry
app.put("/api/journal/:entryId", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const { entryId } = req.params;
  const { entry_name, mood, data } = req.body;

  const stmt = db.prepare(`
    UPDATE journal_entries
    SET entry_name = ?, mood = ?, data = ?
    WHERE id = ? AND user_id = ?
  `);

  stmt.run(entry_name, mood, JSON.stringify(data), entryId, user.id);

  res.json({ message: "Journal entry updated." });
});



//  START SERVER 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});