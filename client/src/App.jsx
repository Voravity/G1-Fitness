import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "./assets/G1Logo.png";
import WorkoutLibrary from "./pages/workoutLibrary"; 
import WorkoutCreation from "./pages/workoutCreation";
import Journal from "./pages/journal";
import AboutUs from "./pages/aboutUs";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./App.css";




function HomePage() {
  return (
    <div>
      <nav id="desktop-nav">
      <img src={logo} className="app-logo" alt="logo"/>  
        <div className="button-group">
          <Link to="/workout-library"><button className="nav-button">Workout Library</button></Link>   
          <Link to="/workout-creation"><button className="nav-button">Create a workout</button></Link>      
          <Link to="/journal"><button className="nav-button">Journal</button></Link>
          <Link to="/about-us"><button className="nav-button">About us</button></Link>
          <Link to="/login"><button className="nav-button">Sign in</button></Link>
        </div>            
      </nav>
      <div className="background"></div>
      <div className="home-title">Welcome to G1 Fitness</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/workout-library" element={<WorkoutLibrary/>}/>  
        <Route path="/workout-creation" element={<WorkoutCreation/>}/>  
        <Route path="/journal" element={<Journal/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;