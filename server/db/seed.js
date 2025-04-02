
// This is just dummy data to insert to database.

import db from "./db.js";

// Clear existing data, if any of course.
db.exec(`DELETE FROM exercises`);
db.exec(`DELETE FROM muscle_groups`);

// Just a copy and paste of data
const data = {
  Arms: {
    Biceps: ["Bicep Curl", "Hammer Curl", "Concentration Curl"],
    Triceps: ["Tricep Dip", "Tricep Pushdown", "Skull Crusher"],
    Forearms: ["Wrist Curl", "Reverse Curl", "Forearm Plank"],
  },
  Back: {
    Upper: ["Seated Cable Row", "Bent-over Barbell Row", "T-Bar Row"],
    Lats: ["Lat Pulldown", "Pull-up", "Chin-up", "Straight-Arm Pulldown"],
    Lower: ["Deadlift", "Barbell Good Mornings", "Back Extension"],
    Traps: ["Shrugs", "Face Pulls", "Upright Row"],
  },
  Chest: {
    Upper: ["Incline Bench Press", "Incline Dumbbell Press", "Incline Push-Up"],
    Middle: ["Bench Press", "Flat Dumbbell Press", "Chest Fly"],
    Lower: ["Decline Bench Press", "Dips (Chest Focused)", "Cable Crossover"],
  },
  Core: {
    Inner: ["Plank", "Bird Dog", "Dead Bug"],
    Outer: ["Side Plank", "Oblique Crunch", "Hang Leg Raise"],
  },
  FullBody: {
    Power: ["Clean and Jerk", "Snatch", "Push Press"],
    Conditioning: ["Burpees", "Kettlebell Swings", "Battle Ropes"],
    BodyWeight: ["Jump Squats", "Push-Up to Plank", "Mountain Climbers"],
  },
  Legs: {
    Quadriceps: ["Barbell Squat", "Leg Press", "Lunges"],
    Hamstrings: ["Romanian Deadlift", "Hamstring Curl", "Glute Bridge"],
    Calves: ["Calf Raise", "Seated Calf Raise", "Donkey Calf Raise"],
    Glutes: ["Hip Thrust", "Cable Kickback", "Step-Ups"],
  },
  Shoulders: {
    Deltoids: ["Overhead Press", "Lateral Raise", "Arnold Press"],
    RotatorCuff: ["External Rotation", "Internal Rotation", "Face Pull"],
  },
};

// Insert all groups and exercises //
// Prepare sets up the SQL but DOES NOT run it at the time of writing
const insertGroup = db.prepare(`
  INSERT INTO muscle_groups (category, subcategory)
  VALUES (?, ?)
`);
// Prepare sets up the SQL but DOES NOT run it at the time of writing
const insertExercise = db.prepare(`
  INSERT INTO exercises (name, muscle_group_id)
  VALUES (?, ?)
`);

/* 

data = {
muscle group: {         <--Category
    muscle1: [          <--Subcategory
        "exercise1",    <--Exercises
        "exercise2"
    ],
    muscle2: [
        "exercise1",
        "exercise2"
    ]
}.
};

*/

// For every category in data
for (const category in data) {
  
  // Subcategories is equal to a data of category
  const subcategories = data[category];
  
  // For each subcategory in Subcategories
  for (const subcategory in subcategories) {
    
    // Runs insertGroup INSERT Query to insert category and subcategory muscle_groups
    const groupResult = insertGroup.run(category, subcategory);
    // Gets id from query
    const groupId = groupResult.lastInsertRowid;

    // Runs insertExercise INSERT Query to insert exercise
    for (const exercise of subcategories[subcategory]) {

      insertExercise.run(exercise, groupId);
    }
  }
}
