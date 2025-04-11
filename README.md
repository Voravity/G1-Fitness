**G1 Fitness** is a fitness companion web application that allows users to log workouts, check meal nutrition, and monitor progress. The app is built with a modern full-stack architecture using React, Express, and SQLite3.


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
    Create a .env file in the server folder or use the one we provide if having issues:

    PORT=8080

    GOOGLE_CLIENT_ID=your-google-client-id ** OR ours: 118698488121-lste8tas2u9tgq2p7qqrttt7ua3hf29p.apps.googleusercontent.com **

    GOOGLE_CLIENT_SECRET=your-google-client-secret ** OR ours: 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 **

    GITHUB_CLIENT_ID=your-github-client-id ** OR ours: Ov23ctwroROaKf3ggb6F

    GITHUB_CLIENT_SECRET=your-github-client-secret ** OR ours: a696e97f7b403e1ebbc543e12a23503e5da92eca **

    FACEBOOK_APP_ID=your-facebook-app-id ** OR ours: 1940265243467908
    
    FACEBOOK_APP_SECRET=your-facebook-app-secret ** OR ours: 361ebaa0a723eafaab2a51f3f2beb3b9 **

    SESSION_SECRET=super-secret-session-string (usually a long string)

    # Populate Database 
    In terminal continue on server directory and do:
    npm run seed 

    This will populate the Database Muscle Groups and Exercises

    # Start The Server
    In terminal do:
    npm run start 


3. Frontend

    # React Setup
    In terminal do:

    (if still in /G1-Fit/server, use 'cd ..' and from /G1-Fit, do the following)
    cd client 
    npm install
    npm run dev

**Notes**
- g1fit.db is not included in the repo for security reasons. Run seed.js to generate it.

- You must run both the backend and frontend servers at the same time for the app to work.

