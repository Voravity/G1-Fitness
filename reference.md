

client/
├── node_modules/           # Installed npm packages for the frontend
├── src/                    # Source folder for React frontend
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components (Navbar, Button, etc.)
│   ├── pages/              # Main route-based pages (Home, About, Login, etc.)
│   ├── App.css             # Global styles for the app
│   ├── App.jsx             # Root component that includes layout and routing
│   ├── index.css           # Optional: base styles, often for CSS resets or themes
│   ├── main.jsx            # React entry point - renders App.jsx into the DOM
│   └── eslint.config.js    # ESLint configuration for linting React code
├── index.html              # HTML template used by Vite
├── package.json            # Project metadata and frontend dependencies
├── package-lock.json       # Locks dependency versions for consistency
└── vite.config.js          # Configuration file for Vite (frontend build tool)

server/
├── controllers/            # Handle logic for different endpoints (e.g., userController.js)
├── middleware/             # Middleware like authentication or logging
├── models/                 # Database models / schemas
├── node_modules/           # Installed npm packages for the backend
├── routes/                 # Express route definitions (e.g., userRoutes.js)
├── package.json            # Project metadata and backend dependencies
├── package-lock.json       # Locks dependency versions for backend
└── server.js               # Entry point for backend (starts Express server)

.gitignore                  # Specifies files/folders Git should ignore
README.md                  # Project overview, setup instructions, etc.
