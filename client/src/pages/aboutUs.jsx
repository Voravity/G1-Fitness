import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/aboutUs.css";
import githubLogo from "../assets/github.png";

//About us page that will introduce our project, along with giving the user access to the repo with all the code. 
function AboutUs() {
    return (
      <div className="about-container">
        <h1 className="title">About Us</h1>
        <hr className="divider" />
  
        <p className="about-text">
          Born from the innovative minds of students at the University of Central Florida, G1 Fitness redefines how you
          interact with your health and fitness regimen. Our platform does more than just simplify the tracking of workouts
          and nutrition; it elevates your entire fitness experience to be more comprehensive, accessible, and engaging.
          At the heart of G1 Fitness is a mission fueled by a passion to empower individuals like you to chase your fitness
          dreams and lead healthier, more active lives. Through our gamified approach, we make consistency not only rewarding
          but also irresistibly fun.
        </p>
  
        <p className="about-text">
          This is our website for our CIS4004 class!
        </p>
  
        <div className="github-link">
          <a href="https://github.com/mysterydoggy/G1-fitness" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub Repo" className="github-logo" />
          </a>
        </div>
  
        <Link to="/">
          <button className="nav-button">Return Home</button>
        </Link>
      </div>
    );
  }
  
export default AboutUs;