import { Navigate } from "react-router-dom";

/*
    Reusable function to check if the user is signed in or not when accessing a page.
    If theres no user info then it redirects them to login page.
    
    Explanation: If they try to access the pages which pull database info like workout library, create a workout and journal 
               : it will check if they are logged on otherwise they will be redirected.
*/ 

function ProtectedRoute({ user, children }) {
  // If user is not logged in, send them to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, show the page they tried to go to
  return children;
}

export default ProtectedRoute;