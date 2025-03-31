import { Link } from "react-router-dom";
import "../App.css";
import "../styles/journal.css";


function Journal() {
  return (
    <div className="journal-container">
      <h1 className="title">Journal</h1>
      <hr className="divider" />

      <p className="journal-description">
        Here you can log, track, and review your workouts and nutrition as you continue your fitness journey.
      </p>

      <Link to="/">
        <button className="nav-button">Return Home</button>
      </Link>
    </div>
  );
}

export default Journal;
