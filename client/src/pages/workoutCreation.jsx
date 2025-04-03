import { useState, useEffect } from "react";
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
  const [exercises, setExercises] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/exercises")
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);      
        setLoading(false);   
      })
      .catch((err) => {
        console.error("Failed to load exercises:", err);
        setLoading(false);
      });
  }, []);

  // Helper to check for duplicates
  function isDuplicate(item) {
    return workoutPlan.some(
      (w) =>
        w.exercise === item.exercise &&
        w.subcategory === item.subcategory &&
        w.category === item.category
    );
  }
  
  // Toggle exercise checkbox
  function handleCheckboxChange(subcategory, exercise) {
    setSelectedExercises((prev) => {
      const current = prev[subcategory] || [];
      const updated = current.includes(exercise)
        ? current.filter((e) => e !== exercise)
        : [...current, exercise];
      return { ...prev, [subcategory]: updated };
    });
  }

  // When a new muscle group is selected
  function handleCategoryChange(category) {
    setActiveCategory(category);
    setActiveSubcategory(null);
  }

  // Add selected exercises to workout plan
  function handleAddToWorkout() {
    if (!activeSubcategory || !selectedExercises[activeSubcategory]) return;

    const newItems = selectedExercises[activeSubcategory].map((exercise) => ({
      category: activeCategory,
      subcategory: activeSubcategory,
      exercise,
    }));

    const duplicates = newItems.filter(isDuplicate);
    if (duplicates.length > 0) {
      setDuplicateMessage("❗ One or more exercises already added.");
      return;
    }

    setWorkoutPlan((prev) => [...prev, ...newItems]);
    setDuplicateMessage("");
    setSelectedExercises((prev) => ({...prev, [activeSubcategory]: [],
    }));
  }

  // Remove an exercise from the plan
  function handleRemove(index) {
    setWorkoutPlan((prev) => prev.filter((_, i) => i !== index));
  }

  // Save workout to database
  function handleSaveWorkout() {
    if (!workoutName || selectedExercises.length === 0) {
      alert("Please enter a workout name and select at least one exercise.");
      return;
    }
  
    fetch("http://localhost:8080/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: workoutName,
        exercises: workoutPlan.map((e) => e.exercise),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Workout saved:", data);
        alert("Workout saved successfully!");
        setSelectedExercises([]);
        setWorkoutName("");
      })
      .catch((err) => {
        console.error("Failed to save workout:", err);
        alert("There was an error saving your workout.");
      });
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Loading your session...</p>
      </div>
    );
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
        <button className="nav-button" onClick={() => setIsWorkoutCreated(true)}>Start Building</button>
      )}

      {isWorkoutCreated && (
        <div className="workout-form">
          <input
            type="text"
            placeholder="Enter Workout  Name"
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
                    type="checkbox" className="checkbox"
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
                        <button className="remove-button" onClick={() => handleRemove(index)}>❌ Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="nav-button" onClick={handleSaveWorkout}>Save Workout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutCreation;