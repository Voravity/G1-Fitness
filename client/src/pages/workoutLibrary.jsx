import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/G1Logo.png";
import "../styles/workoutLibrary.css";

function WorkoutLibrary() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/workouts", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRoutines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workouts:", err);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (index) => {
    setExpandedId((prev) => (prev === index ? null : index));
  };
/* check the backend on this if youd like
  function handleDeleteWorkout(workoutId, workoutName) {
    const confirmDelete = window.confirm(`Are you sure you want to delete routine "${workoutName}"?`);
    if (!confirmDelete) return;
  
    fetch(`http://localhost:8080/api/user/workouts/${workoutId}`, {
      method: "DELETE",
      credentials: "include",
    })
    //remove the deleted workout
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setRoutines((prev) => prev.filter((r) => r.id !== workoutId));
      })
      .catch((err) => {
        console.error("Error deleting workout:", err);
        alert("Failed to delete workout.");
      });
  }
  */


  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="G1 Fitness Logo" className="logo" />
        <h1 className="title">Workout Routines</h1>
        <Link to="/">
          <button className="nav-button">Return Home</button>
        </Link>
      </div>

      <hr className="divider" />

      <p className="library-description">
        Select a workout to view its exercises and log a journal entry.
      </p>

      <div className="routine-container">
        {loading ? (
          <p>Loading your workouts...</p>
        ) : routines.length === 0 ? (
          <>
            <p>No saved routines yet.</p>
            <Link to="/workout-creation">
              <button className="nav-button">Create a Workout</button>
            </Link>
          </>
        ) : (
          routines.map((routine, index) => (
            <div key={index} className="routine-card">
              <button
                className="routine-button"
                onClick={() => toggleExpand(index)}
              >
                {routine.name}
              </button>

              {expandedId === index && (
                <div className="routine-details">
                  <ul>
                    {routine.exercises.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                  <Link
                     to="/journal"
                     state={{ routine, forceNew: true }}
                  >
                    <button className="nav-button">Log Entry</button>
                  </Link>
                  {/* check backend on this
                  <button
                    className="nav-button delete-button"
                    onClick={() => handleDeleteWorkout(routine.id, routine.name)}
                  >
                    Delete Routine
                  </button>
                  */}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Link to="/">
        <button className="nav-button">Back Home</button>
      </Link>
    </div>
  );
}

export default WorkoutLibrary;
