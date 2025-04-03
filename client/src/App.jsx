import { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, Route, Routes, Link} from "react-router-dom";

import logo from "./assets/G1Logo.png";
import WorkoutLibrary from "./pages/workoutLibrary"; 
import WorkoutCreation from "./pages/workoutCreation";
import Journal from "./pages/journal";
import AboutUs from "./pages/aboutUs";
import Login from "./pages/login";
import ProtectedRoute from "./components/protectedRoute";

import "./App.css";

function HomePage({user, setUser, getUser}) {
  const navigate = useNavigate();
  
  // This is the code change the buttons depending on wether theres a user or no user
  let authButton;

  // If there is a user 
  if(user){
    authButton = (
      
      <button
        className="nav-button"
        onClick={() => {
          fetch("http://localhost:8080/auth/logout", {
            credentials: "include",
          })
            .then((res) => {
              if (res.ok) {
                console.log("Logged out");
                getUser();        
                navigate("/");    
              } else {
                console.log("Logout failed");
              }
            })
            .catch((err) => {
              console.error("Error during logout:", err);
            });
        }}
      > 
      Log Out</button>
    );
  } else { 
    authButton = (
      <Link to="/login">
        <button className="nav-button">Sign In</button>
      </Link>
    );
  }

  return (
    <div>
      <nav id="desktop-nav">
      <img src={logo} className="app-logo" alt="logo"/>  
        <div className="button-group">
          <Link to="/workout-library"><button className="nav-button">Workout Library</button></Link>   
          <Link to="/workout-creation"><button className="nav-button">Create a workout</button></Link>      
          <Link to="/journal"><button className="nav-button">Journal</button></Link>
          <Link to="/about-us"><button className="nav-button">About us</button></Link>
          {authButton}
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
  const [loading, setLoading] = useState(true);

  // fetches the user information and checks if they are logged in
  const getUser = () => {
    fetch("http://localhost:8080/auth/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setUser(null);
        setLoading(false);
      });
  };
  
  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Loading your session...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Pages */}

        {/* Add condition so if the user is logged in he sees a different home page */}
        <Route path="/" element={<HomePage user={user} setUser={setUser} getUser={getUser}/>}/>

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