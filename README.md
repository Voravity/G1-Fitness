# G1 Fitness

**G1 Fitness** is a fitness companion web application that allows users to log workouts, check meal nutrition, and monitor progress. The app is built with a modern full-stack architecture using React, Express, and SQLite3.

---

## Features

- User authentication (OAuth planned)
- Workout logging and history
- Nutrition logging with API integration
- Dashboard for progress tracking

---

## Tech Stack

### Frontend
- React + Vite
- React Router

### Backend
- Node.js + Express

### Authentication Scheme
- Oauth: Google, Facebook, Github

### Database
- SQLite

---

## Prerequisites

- Node.js and npm installed
- Personal Google/GitHub/Facebook OAuth credentials

---

## Instructions

### Clone the repo

---

### Express Setup

In terminal do:

```bash
cd server
npm install
```

---

### Environment Setup

**NOTE: FOR UCF GRADER, TO MAKE IT EASIER TO GRADE FOLLOW THESE INSTRUCTIONS (recommended):**

Create a `.env` file in the `server` folder and write the following lines:

```
PORT=8080
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=super-secret-session-string
```

Then go to the `server/auth` folder, and in `authRoutes` and `authPassport`, comment out the code for GitHub and Facebook. There is already a comment like `/*TO COMMENT ALL DELETE ->*/`; just delete the `*/` to comment all the relevant code.

---

**Otherwise follow below:**

Create a `.env` file in the `server` folder and write the following lines:

```
PORT=8080
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
SESSION_SECRET=super-secret-session-string
```

---

### Populate Database

In the terminal (while still in the `server` directory):

```bash
npm run seed
```

This will populate the database with Muscle Groups and Exercises.

---

### Start The Server

You may start two terminals, one for `/server`, one for `/client`.

In terminal:

```bash
npm run start
```

---

### Frontend

In terminal:

```bash
cd ..
cd client
npm install
npm run dev
```

---

## Notes

- `G1.db` is not included in the repo for security reasons. Run `seed.js` to generate it.
- You must run both the backend and frontend servers at the same time for the app to work.

---

## ********* AI USAGE ********

- **AIs used:** ChatGPT 4o and 4o mini  
- AI was primarily used for debugging, especially when we encountered problems we couldn’t figure out ourselves. We would input the code that was throwing errors and ask the AI to help identify the issue and suggest a fix with an explanation.  
- AI also helped with syntax fixing, connecting front-end actions to backend routes (`app.get`, `app.post`), writing handler functions, and clarifying programming concepts or flow.  
- In some cases, we asked AI to provide skeletons for the functionalities we described.  
- **Pages affected include:**  
  - `server.js`  
  - `journal.jsx` (useEffect, handler functions, syntax help, data relations, debugging)  
  - `workoutCreation.jsx` (handler functions, syntax help, debugging)  
- The writer of this section does not allow ChatGPT to save chats. All prompts were crafted manually, usually copying error messages or code snippets into the chat to get assistance.


- AIs used: ChatGPT 4o and 4o mini
- If we ran into problems we couldn't debug or were having problems with we would give the AI our newly written code and ask it to assist us in fixing it or finding the root cause of the problem.
- AI is mostly used to debug but is also used for syntax fixing and combining functions/actions to different points (like front end of a page to a server `app.get` or `post` call, or handle functions)

