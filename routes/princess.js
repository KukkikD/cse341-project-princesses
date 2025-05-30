const express = require("express");
const router = express.Router();
const princesstController = require("../controllers/princess");
const validateCreatePrincess = require("../middleware/validateCreatePrincess");
const validateUpdatePrincess = require("../middleware/validateUpdatePrincess");
const ensureAuthenticated = require("../middleware/authentication");

// GET all princesses
router.get("/", princesstController.getAll);

// GET a single princess by ID
router.get("/:id", princesstController.getSingle);

// POST a new Princess
router.post("/", ensureAuthenticated, validateCreatePrincess, princesstController.createPrincess);

// PUT update a princess by ID
router.put("/:id", ensureAuthenticated, validateUpdatePrincess, princesstController.updatePrincess);

// DELETE a princess by ID
router.delete("/:id", ensureAuthenticated, princesstController.deletePrincess);

module.exports = router;