
/* 
    Using better-sqlite3 for easier coding instead of sequelize
    
    EXPLANATION:
    sequelize lets you define your database structure using JavaScript instead of SQL.

    better-sqlite3 lets you write your own SQL queries in SQL language.

 */

import Database from "better-sqlite3";

//Makes a connection to database file named G1.db; it will let js code talk to it.
const db = new Database("G1.db");  

// Create a users table if it doesn't exist
// ** In Sqlite TEXT is just a very big string so can be used here
// ** Executes runs the the SQL written
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    provider TEXT,
    display_name TEXT,
    email TEXT
  )
`);

/* Creating data table for all exercises */
// Muscle groups
db.exec(`
  CREATE TABLE IF NOT EXISTS muscle_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    subcategory TEXT
  )
`);
  
// Exercises
db.exec(`
  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    muscle_group_id INTEGER,
    FOREIGN KEY (muscle_group_id) REFERENCES muscle_groups(id)
  )
`);

/* Creating data table for Saved Workouts */
// Workouts
db.exec(`
  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Workout Exercises
db.exec(`
  CREATE TABLE IF NOT EXISTS workout_exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id INTEGER,
    exercise_name TEXT,
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
  )
`);

export default db;