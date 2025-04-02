import { Link } from "react-router-dom";

import logo from "../assets/G1Logo.png";

import "../styles/workoutLibrary.css";

function WorkoutLibrary() {
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
        Here you can find different workouts for your fitness journey.
        Start with one of these routines or create your own!
      </p>

      {/* Placeholder for future routines */}
      <div className="routine-container">
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