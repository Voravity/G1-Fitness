import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import logo from "./assets/G1Logo.png";
import WorkoutLibrary from "./pages/workoutLibrary"; 
import WorkoutCreation from "./pages/workoutCreation";
import Journal from "./pages/journal";
import AboutUs from "./pages/aboutUs";
import Login from "./pages/login";
import ProtectedRoute from "./components/protectedRoute";

import "./App.css";


function HomePage({user}) {
  
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

// Main Router Hub
function App() {
  const [user, setUser] = useState(null);

  // fetches the user information and checks if they are logged in
  useEffect(() => {
    fetch("http://localhost:8080/auth/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // return user data
        } else {
          return null; // not logged in or error
        }
      })
      .then((data) => {
        setUser(data); 
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setUser(null);
      });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Pages */}

        {/* Add condition so if the user is logged in he sees a different home page */}
        <Route path="/" element={<HomePage user={user}/>}/>

        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/login" element={<Login/>}/>

        {/* Protected Pages */}
        <Route path="/workout-library" element={
          <ProtectedRoute user={user}>
            <WorkoutLibrary />
          </ProtectedRoute>
        } />

        <Route path="/workout-creation" element={
          <ProtectedRoute user={user}>
            <WorkoutCreation />
          </ProtectedRoute>
        } />  
        
        <Route path="/journal" element={
          <ProtectedRoute user={user}>
            <Journal />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;