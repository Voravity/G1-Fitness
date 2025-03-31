import { useState } from "react";
import { Link } from "react-router-dom";
//import "css sheet"; 
import "../App.css";


function WorkoutCreation() {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState({
    Chest: [],
    Core: [],
    Legs: [],
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const [isWorkoutCreated, setIsWorkoutCreated] = useState(false); 
  const exercises = {
    Chest: ["Push-up", "Bench Press", "Incline Press"],
    Core: ["Sit-up", "Crunches", "Plank"],
    Legs: ["Squats", "Lunges", "Leg Press"],
  };

  const handleCheckboxChange = (category, exercise) => {
    setSelectedExercises((prevState) => {
      const updatedCategory = prevState[category].includes(exercise)
        ? prevState[category].filter((item) => item !== exercise)
        : [...prevState[category], exercise];
      return { ...prevState, [category]: updatedCategory };
    });
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  const handleSaveWorkout = () => {
    // handle saving the workout routine here, needs work
    console.log("Workout Saved:", workoutName, selectedExercises);
  };

  const handleCreateWorkout = () => {
    setIsWorkoutCreated(true); // toggle the visibility of the content
  };

  return (
    <div className="createworkout">
        <h1 className="Tit">Workout Creation</h1>
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>

      {/* create workout button */}
      {!isWorkoutCreated && (
        <button className="create-workout-button" onClick={handleCreateWorkout}>
          Create Workout
        </button>
      )}

      {/* content appears after clicking workout buttn */}
      {isWorkoutCreated && (
        <div className="content-container show">
          {/* workout name input */}
          <input
            type="text"
            className="workout-name-input"
            placeholder="Enter workout name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />

          {/* muscle categories, choice */}
          <div className="muscle-group-buttons">
            {Object.keys(exercises).map((category) => (
              <button
                key={category}
                className={`muscle-group-button ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* list by category */}
          {activeCategory && (
            <div className="exercise-list">
              {exercises[activeCategory].map((exercise) => (
                <div key={exercise} className="exercise-item">
                  <input
                    type="checkbox"
                    checked={selectedExercises[activeCategory].includes(exercise)}
                    onChange={() =>
                      handleCheckboxChange(activeCategory, exercise)
                    }
                  />
                  {exercise}
                </div>
              ))}
            </div>
          )}

          {/* save button, not functional */}
          <div className="save-button-container">
            <button className="save-button" onClick={handleSaveWorkout}>
              Save Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutCreation;
