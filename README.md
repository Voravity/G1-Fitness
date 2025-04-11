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
- SQLite


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
    # NOTE: FOR UCF GRADER, TO MAKE IT EASIER TO GRADE FOLLOW THESE INSTRUCTIONS (recommended):
    - Create a .env file in the server folder and write the following lines:
    
    PORT=8080
    
    GOOGLE_CLIENT_ID=your-google-client-id 

    GOOGLE_CLIENT_SECRET=your-google-client-secret

    SESSION_SECRET=super-secret-session-string (input a string)

    - Go to server folder, then auth folder, in authRoutes and authPassport comment out the code for github and facebook. 
    - Theres already a comment like /*TO COMMENT ALL DELETE ->*/ just delete the */ to comment all the relevant code.

    # Otherwise follow below:
    Create a .env file in the server folder and write the following lines:

    PORT=8080

    GOOGLE_CLIENT_ID=your-google-client-id 

    GOOGLE_CLIENT_SECRET=your-google-client-secret 

    GITHUB_CLIENT_ID=your-github-client-id 

    GITHUB_CLIENT_SECRET=your-github-client-secret 

    FACEBOOK_APP_ID=your-facebook-app-id 
    
    FACEBOOK_APP_SECRET=your-facebook-app-secret 

    SESSION_SECRET=super-secret-session-string (usually a long string)

    # Populate Database 
    In terminal continue on server directory and do:
    npm run seed 

    This will populate the Database Muscle Groups and Exercises
    

    # Start The Server      (you may start two terminals, one for /server, one for /client)
    In terminal do:
    npm run start 


3. Frontend

    # React Setup
    In terminal do:

    (if still in /G1-Fitness/server, use 'cd ..' and from /G1-Fitness, do the following)
    cd client 
    npm install
    npm run dev

**Notes**
- G1.db is not included in the repo for security reasons. Run seed.js to generate it.

- You must run both the backend and frontend servers at the same time for the app to work.

##   ********* AI USAGE ********

- AIs used: ChatGPT 4o and 4o mini

- If we ran into a problems we couldn't debug or were having problems with we would give the AI our newly written code and ask it to assist us fixing it or finding the root cause of the problem.

- AI mostly used to debug but also used for syntaxing and combining functions/actions to different points (like front end of a page to a server app.get or post call, or handle functions)

- Pages affected: server.js, journal.jsx (useEffect, handle functions and syntaxing, data relations, debugging), workoutCreation.jsx (handle functions syntax, debugging)

- Writer of this section does not allow ChatGPT to save chats, but prompts I used were frequently selections of code throwing errors in the terminal upon running, asking AI to find and break down the cause of the issue and provide explained remedials. Other times I asked AI to provide skeleton for functionalities I described or asked AI to explain processes or concepts in the programming task at hand in that moment.
