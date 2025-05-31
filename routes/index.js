const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureAuthenticated  = require("../middleware/authentication");

// Main app routes
router.use("/princess", require("./princess"));
router.use("/castle", require("./castle"));

// GitHub OAuth routes
router.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/protected");
  });

router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => { // Delete session from server
      res.send("🔓 You have logged out.");
    });
  });
});

// Protected test route
router.get("/protected", ensureAuthenticated, (req, res) => {
  res.send("🔐 You are logged in with GitHub!" ); // if api communicate with frontend change to res.json
});

module.exports = router;