import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/G1Logo.png"; 

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");  // Add email state for signup

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup Attempt:", { username, email, password });
    };

    return (
        <div className="login-header">
          <div className="form-box">
            <h1 className="auth-title">Sign Up</h1>
            <p className="auth-header">Please enter your details to create an account.</p>
            
            <button className="auth-button">Sign Up with Google</button>
            <button className="auth-button">Sign Up with Apple</button>
            
            <hr /> 

            <form onSubmit={handleSubmit}>
              <div>
                <label className="auth-text">Email:</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="auth-text">Username:</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Choose a username"
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
    
              <button type="submit" className="auth-button">Create Account</button>
            </form>

            <p style = {{fontSize: "18px"}}>Already have an account? <Link className="Links" to="/login">Sign In</Link></p>
            <Link to="/">
              <button className="nav-button">Home</button>
            </Link>
          </div>
          <img className="logo" src={logo} alt="G1 Fitness Logo" />
        </div>
    );
}

export default Signup;
