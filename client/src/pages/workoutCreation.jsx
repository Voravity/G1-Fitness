import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/G1Logo.png";
import dumbbell from "../assets/dumbbell.png";

import "../styles/workoutCreation.css"; 

function WorkoutCreation() {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [isWorkoutCreated, setIsWorkoutCreated] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("");

  const exercises = {
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
      Power: ["Clean and Jerk", "Snatch", "Snatch"],
      Conditioning: ["Burpees", "Kettlebell Swings", "Battle Ropes"],
      BodyWeight: ["Jump Squats", "Push-Up to Plank", "Mountain Climbers"],
    },
    Legs: {
      Quadriceps: ["Barbell Squat", "Leg Press", "Lunges"],
      Hamstrings: ["Deadlift", "Hamstring Curl", "Glute Bridge"],
      Calves: ["Calf Raise", "Seated Calf Raise", "Donkey Calf Raise"],
      Glutes: ["Hip Thrust", "Cable Kickback", "Glute Bridge"],
    },
    Shoulders: {
      Deltoids: ["Overhead Press", "Lateral Raise", "Upright Row"],
      RotatorCuff: ["External Rotation", "Internal Rotation", "Face Pull"],
    },
  };

  function handleCheckboxChange(subcategory, exercise) {
    setSelectedExercises((prev) => {
      const current = prev[subcategory] || [];
      const updated = current.includes(exercise)
        ? current.filter((e) => e !== exercise)
        : [...current, exercise];
      return { ...prev, [subcategory]: updated };
    });
  }

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setActiveSubcategory(null);
  }

  function handleAddToWorkout() {
    if (!activeSubcategory || !selectedExercises[activeSubcategory]) return;

    const newItems = selectedExercises[activeSubcategory].map((exercise) => ({
      category: activeCategory,
      subcategory: activeSubcategory,
      exercise,
    }));

    const duplicates = newItems.filter((item) =>
      workoutPlan.some(
        (w) =>
          w.exercise === item.exercise &&
          w.subcategory === item.subcategory &&
          w.category === item.category
      )
    );

    if (duplicates.length > 0) {
      setDuplicateMessage("❗ One or more exercises already added.");
      return;
    }

    setWorkoutPlan((prev) => [...prev, ...newItems]);
    setDuplicateMessage("");
    setSelectedExercises((prev) => ({
      ...prev,
      [activeSubcategory]: [],
    }));
  }

  function handleRemove(index) {
    setWorkoutPlan((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSaveWorkout() {
    console.log("Workout Saved:", workoutName, workoutPlan);
  }

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="G1 Fitness Logo" className="logo" />
        <h1 className="title">Create a Workout</h1>
        <Link to="/">
          <button className="nav-button header-home-button">Return Home</button>
        </Link>
      </div>
      
      <hr className="divider" />

      <div className="icon">
        <img src={dumbbell} alt="Dumbbell Icon" className="dumbbell-icon" />
      </div>

      {!isWorkoutCreated && (
        <button className="nav-button" onClick={() => setIsWorkoutCreated(true)}>
          Start Building
        </button>
      )}

      {isWorkoutCreated && (
        <div className="workout-form">
          <input
            type="text"
            placeholder="Enter Exercise Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="input-field"
          />

          <select
            value={activeCategory || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="input-field"
          >
            <option value="">Select Muscle Group</option>
            {Object.keys(exercises).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {activeCategory && (
            <select
              value={activeSubcategory || ""}
              onChange={(e) => setActiveSubcategory(e.target.value)}
              className="input-field"
            >
              <option value="">Select Target Muscle</option>
              {Object.keys(exercises[activeCategory]).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          )}

          {activeSubcategory && (
            <div className="exercise-list">
              {exercises[activeCategory][activeSubcategory].map((exercise) => (
                <label key={exercise} className="exercise-item">
                  <input
                    type="checkbox"
                    checked={selectedExercises[activeSubcategory]?.includes(exercise) || false}
                    onChange={() => handleCheckboxChange(activeSubcategory, exercise)}
                  />
                  {exercise}
                </label>
              ))}

              {selectedExercises[activeSubcategory]?.length > 0 && (
                <button className="nav-button" onClick={handleAddToWorkout}>+ Add to Workout</button>
              )}
              {duplicateMessage && (
                <p className="error-text">{duplicateMessage}</p>
              )}
            </div>
          )}

          {workoutPlan.length > 0 && (
            <div className="workout-plan">
              <h3>Workout Plan</h3>
              <table className="workout-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Muscle Group</th>
                    <th>Exercise</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {workoutPlan.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.subcategory} - {item.category}</td>
                      <td>{item.exercise}</td>
                      <td>
                        <button onClick={() => handleRemove(index)}>❌ Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="nav-button" onClick={handleSaveWorkout}>
                Save Workout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutCreation;