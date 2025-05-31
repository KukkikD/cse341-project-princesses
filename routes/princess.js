const express = require("express");
const router = express.Router();
const princessController = require("../controllers/princess");
const validateCreatePrincess = require("../middleware/validateCreatePrincess");
const validateUpdatePrincess = require("../middleware/validateUpdatePrincess");
const ensureAuthenticated = require("../middleware/authentication");

// GET all princesses
router.get("/", princessController.getAll);

// GET a single princess by ID
router.get("/:id", princessController.getSingle);

// POST a new Princess
router.post("/", ensureAuthenticated, validateCreatePrincess, princessController.createPrincess);

// PUT update a princess by ID
router.put("/:id", ensureAuthenticated, validateUpdatePrincess, princessController.updatePrincess);

// DELETE a princess by ID
router.delete("/:id", ensureAuthenticated, princessController.deletePrincess);

module.exports = router;