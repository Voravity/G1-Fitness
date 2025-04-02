import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/G1Logo.png";
import githubLogo from "../assets/github.png";

import "../styles/aboutUs.css";

//About us page that will introduce our project, along with giving the user access to the repo with all the code. 
function AboutUs() {
    return (
      <div className="container">
        <div className="header">
              <img src={logo} alt="G1 Fitness Logo" className="logo" />
                <h1 className="title">About Us</h1>                
                <Link to="/">
                  <button className="nav-button">Return Home</button>
                </Link>
                
        </div>
        
        <hr className="divider" />
  
        <p className="description">
          Born from the innovative minds of students at the University of Central Florida, G1 Fitness redefines how you
          interact with your health and fitness regimen. Our platform does more than just simplify the tracking of workouts
          and nutrition; it elevates your entire fitness experience to be more comprehensive, accessible, and engaging.
          At the heart of G1 Fitness is a mission fueled by a passion to empower individuals like you to chase your fitness
          dreams and lead healthier, more active lives. Through our gamified approach, we make consistency not only rewarding
          but also irresistibly fun.
        </p>
  
        <p className="description">
          This is our website for our CIS4004 class!
        </p>
  
        <div>
          <a href="https://github.com/Voravity/G1-Fit" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub Repo" className="github-logo" />
          </a>
        </div>
      </div>
    );
  }
  
export default AboutUs;