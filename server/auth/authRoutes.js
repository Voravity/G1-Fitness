import express from "express";
import passport from "./authPassports.js";

const router = express.Router();

// 🔹 Google Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    res.send(`
      <html><body><script>
        window.opener.postMessage("oauth-success", "*");
        window.close();
      </script></body></html>
    `);
  }
);

/*TO COMMENT ALL DELETE -> */
// 🔹 GitHub Routes
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    res.send(`
      <html><body><script>
        window.opener.postMessage("oauth-success", "*");
        window.close();
      </script></body></html>
    `);
  }
);

// 🔹 Facebook Routes
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    res.send(`
      <html><body><script>
        window.opener.postMessage("oauth-success", "*");
        window.close();
      </script></body></html>
    `);
  }
);
/* <- DELETE TO COMMENT ALL*/

// 🔸 Logout + User Info
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

export default router;