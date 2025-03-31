import { Link } from "react-router-dom";
import "../App.css";
import "../styles/workoutLibrary.css";

function WorkoutLibrary() {
  return (
    <div className="library-container">
      <h1 className="library-title">Workout Routines</h1>
      <hr className="divider" />

      <p className="library-description">
        Here you can find different workouts for your fitness journey.
        Start with one of these routines or create your own!
      </p>

      {/* Placeholder for future routines */}
      <div className="routine-placeholder">
        <p>No saved routines yet.</p>
        <Link to="/workout-creation">
          <button className="nav-button">Create a Workout</button>
        </Link>
      </div>

      <Link to="/">
        <button className="nav-button">Back Home</button>
      </Link>
    </div>
  );
}

export default WorkoutLibrary;