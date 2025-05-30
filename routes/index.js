const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated } = require("../middleware/authentication");

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

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Protected test route
router.get("/protected", ensureAuthenticated, (req, res) => {
  res.json({ message: "You are logged in with GitHub!", user: req.user });
});

module.exports = router;