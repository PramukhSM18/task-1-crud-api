const { body, validationResult } = require('express-validator');

const validateProductUpdate = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Name must be 100 characters or fewer'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0')
    .toFloat(),
  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be true or false')
    .toBoolean(),
  (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Provide at least one field to update' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateProductUpdate;
