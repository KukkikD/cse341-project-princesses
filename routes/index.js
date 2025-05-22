const express = require("express");
const router = express.Router();

router.use("/princess", require("./princess"));

module.exports = router;