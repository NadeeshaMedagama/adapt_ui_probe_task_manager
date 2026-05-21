const { body, validationResult } = require('express-validator')

const taskValidationRules = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title max 100 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Invalid priority value'),
  body('status')
    .optional()
    .isIn(['todo', 'in_progress', 'in_review', 'done'])
    .withMessage('Invalid status value'),
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Invalid date format')
]

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array()
    })
  }
  next()
}

module.exports = { taskValidationRules, validate }
