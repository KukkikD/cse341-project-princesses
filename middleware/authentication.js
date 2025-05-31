function ensureAuthenticated(req, res, next) {
  //console.log("Checking authentication...");
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json("You do no have access");
}

module.exports = ensureAuthenticated;