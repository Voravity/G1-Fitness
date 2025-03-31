import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
//import "./Authentication.css";
import Signup from "./signup";
import logo from "../assets/G1Logo.png"; 


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Attempt:", { username, password });
    };

    return (
        <div className="login-header">
          <div className="auth-box">
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-header">Please enter your credentials to sign in.</p>
            
            <button className="auth-button">Sign In with Google</button>
            <button className="auth-button">Sign In with Apple</button>
            
            <hr /> 

            <form onSubmit={handleSubmit}>
              <div>
                <label className="auth-text">Username:</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="auth-text">Password:</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
    
              <button type="submit" className="auth-button">Sign In</button>
            </form>

            <p><Link className="Links" to="#">Forgot password?</Link></p>
            <p style = {{fontSize: '18px'}}>New User? <Link className="Links" to="/Signup">Sign Up</Link>
            </p>
            <Link to="/">
              <button className="nav-button">Home</button>
            </Link>
          </div>
          <img className="logo" src={logo} alt="G1 Fitness Logo" />
        </div>
    );
}

export default Login;
