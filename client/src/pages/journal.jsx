import { Link } from "react-router-dom";

import logo from "../assets/G1Logo.png";

import "../index.css";
import "../styles/journal.css";

function Journal() {
  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="G1 Fitness Logo" className="logo" />
        <h1 className="title">Journal</h1>                
        <Link to="/">
          <button className="nav-button">Return Home</button>
        </Link>            
      </div>

      <hr className="divider" />

      <p className="description">Here you can log, track, and review your workouts and nutrition as you continue your fitness journey.</p>

    </div>
  );
}

export default Journal;