const validator = require("../helpers/validator");

const validateUpdatePrincess = (req, res, next) => {
  const rules = {
    name: "string",
    movie: "string",
    yearReleased: "integer|min:1900|max:2025",
    kingdom: "string",
    mainColor: "string",
    rating: "integer|min:1|max:5"
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next(); // when passed validation, next to controller
    }
  });
};

module.exports = validateUpdatePrincess;