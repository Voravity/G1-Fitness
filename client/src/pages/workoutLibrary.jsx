import { Link } from "react-router-dom";
import "../App.css";

function WorkoutLibrary() {
  return (

    <div className="App-header">
      <div className="Title"><h1>Workout Routines</h1></div>
      
      <p>Here you can find different workouts for your fitness journey.</p>
      
      
      <Link to="/">
        <button className="nav-button">Back Home</button>
      </Link>
    </div>
  );
}

export default WorkoutLibrary;
