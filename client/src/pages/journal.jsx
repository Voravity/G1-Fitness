import { Link } from "react-router-dom";
import "../App.css";

function Journal() {
  return (

    <div className="App-header">
      <div className="Title"><h1>Journal</h1></div>
      <p>Here you can find different workouts for your fitness journey.</p>
            
      <Link to="/">
        <button className="nav-button">Home</button>
      </Link>
    </div>
  );
}

export default Journal;
