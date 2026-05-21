const { validateEmail, validateRequiredFields } = require('../utils/validators')
const { addUser, findUserByEmail } = require('../data/store')

const register = (req, res, next) => {
  try {
    validateRequiredFields(req.body, ['name', 'email'])
    validateEmail(req.body.email)

    if (findUserByEmail(req.body.email)) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const user = addUser({ name: req.body.name, email: req.body.email })
    return res.status(201).json({ user })
  } catch (err) {
    return next(err)
  }
}

const login = (req, res, next) => {
  try {
    validateRequiredFields(req.body, ['email'])
    validateEmail(req.body.email)

    const user = findUserByEmail(req.body.email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ token: 'demo-token' })
  } catch (err) {
    return next(err)
  }
}

module.exports = { register, login }

