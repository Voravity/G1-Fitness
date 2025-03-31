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
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <div className="button-group">
            <Link to="/WorkoutLibrary"><button className="nav-button">Workout Library</button></Link>   
            <Link to="/WorkoutCreation"><button className="nav-button">Create a workout</button></Link>      
            <Link to="/Journal"><button className="nav-button">Journal</button></Link>
            <Link to="/AboutUs"><button className="nav-button">About us</button></Link>
            <Link to="/Login"><button className="nav-button">Sign in</button></Link>
            
          </div>
        </div>
        
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="Title"><h1>Welcome to G1 Fitness</h1></div>
          
      </header>
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