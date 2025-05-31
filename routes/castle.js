const express = require("express");
const router = express.Router();
const castleController = require("../controllers/castle");
const validateCreateCastle = require("../middleware/validateCreateCastle");
const validateUpdateCastle = require("../middleware/validateUpdateCastle");
const ensureAuthenticated = require("../middleware/authentication");

// Get all castle
router.get("/", castleController.getAll);

// GET a single castle by ID
router.get("/:id", castleController.getSingle);

// POST a new castle
router.post("/", ensureAuthenticated,validateCreateCastle, castleController.createCastle);

// PUT update a castle
router.put("/:id", ensureAuthenticated, validateUpdateCastle, castleController.updateCastle);

// DELETE a castle
router.delete("/:id", ensureAuthenticated, castleController.deleteCastle);

module.exports = router;