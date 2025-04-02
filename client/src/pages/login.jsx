import { Link } from "react-router-dom";
import { useEffect } from "react";

import logo from "../assets/G1Logo.png";
import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import github from "../assets/github.png";

import "../styles/login.css";


function Login() {

  const handleOAuthLogin = (provider) => {
    // Open link to authenticator in new tabs
    const width = 500;
    const height = 600;

    // This is just so the pop-up opens in the center of the screen
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
  
    window.open(
      `http://localhost:8080/auth/${provider}`,
      "OAuthLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "oauth-success") {
        window.location.href = "/"; // redirect to homepage after login
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };

  });

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