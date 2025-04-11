import Database from "better-sqlite3";

//makes a connection to database file named G1.db
const db = new Database("G1.db");  

// create a users table if  doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    provider TEXT,
    display_name TEXT,
    email TEXT
  )
`);


// muscle groups
db.exec(`
  CREATE TABLE IF NOT EXISTS muscle_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    subcategory TEXT
  )
`);
  
// exercises
db.exec(`
  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    muscle_group_id INTEGER,
    FOREIGN KEY (muscle_group_id) REFERENCES muscle_groups(id)
  )
`);

// workouts
db.exec(`
  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// workout exercises
db.exec(`
  CREATE TABLE IF NOT EXISTS workout_exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id INTEGER,
    exercise_name TEXT,
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
  )
`);

// journal entries table 
db.exec(`
  CREATE TABLE IF NOT EXISTS journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    routine_id INTEGER,
    entry_name TEXT,
    mood TEXT,
    date_created TEXT,
    data TEXT, -- JSON string of sets/reps/weight/etc
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (routine_id) REFERENCES workouts(id)
  )
`);



export default db;