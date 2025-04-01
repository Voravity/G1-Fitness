import { Link } from "react-router-dom";
import logo from "../assets/G1Logo.png";
import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import github from "../assets/github.png";

import "../App.css";
import "../styles/login.css";


function Login() {
  const handleOAuthLogin = (provider) => {
    // Open link to authenticator in new tabs
    window.open(`http://localhost:8080/auth/${provider}`, "_blank","noopener,noreferrer");
  };

  return (
    <div className="login-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign In or Sign Up</h1>
        <p className="auth-header">Use one of your existing accounts:</p>

        <button className="auth-button" onClick={() => handleOAuthLogin("google")}>
          <img src={google} alt="Google" />
          Continue with Google
        </button>
        <button className="auth-button" onClick={() => handleOAuthLogin("facebook")}>
          <img src={facebook} alt="Facebook" />
          Continue with Facebook
        </button>
        <button className="auth-button" onClick={() => handleOAuthLogin("github")}>
          <img src={github} alt="GitHub" />
          Continue with GitHub
        </button>

        <Link to="/">
          <button className="nav-button">Back Home</button>
        </Link>
      </div>

      <img className="logo" src={logo} alt="G1 Fitness Logo" />
    </div>
  );
}

export default Login;