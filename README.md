**G1 Fitness** is a fitness tracking web application that allows users to log workouts, track meals, and monitor progress. The app is built with a modern full-stack architecture using React, Express, and MySQL.


**Features**
-   User authentication (OAuth planned)
-   Workout logging and history
-   Nutrition logging with API integration
-   Dashboard for progress tracking


**Tech Stack**
## Frontend
- React + Vite
- React Router

## Backend
- Node.js + Express

## Authentication Scheme
- Oauth: Google, Facebook, Github

## Database
- SQLite via better-sqlite3


**Prerequisites**
- Node.js and npm installed
- Personal Google/GitHub/Facebook OAuth credentials


**Instructions**

1. clone the repo

2. Backend Setup
    
    # Express Setup
    In terminal do:

    cd server 
    npm install

    # Environment Setup
    Create a .env file in the server folder:

    PORT=8080

    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret

    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret

    FACEBOOK_APP_ID=your-facebook-app-id
    FACEBOOK_APP_SECRET=your-facebook-app-secret

    SESSION_SECRET=super-secret-session-string

    # Populate Database 
    In terminal do:
    npm run seed 

    This will populate the Muscle Groups and Exercises

    # Start The Server
    In terminal do:
    npm run start 


3. Frontend

    # React Setup
    In terminal do:

    cd client 
    npm install
    npm run dev

**Notes**
- g1fit.db is not included in the repo for security reasons. Run seed.js to generate it.

- You must run both the backend and frontend servers at the same time for the app to work.