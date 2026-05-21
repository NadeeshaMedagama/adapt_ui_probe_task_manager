const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { getIntendedUrl } = require('../utils/redirectHelper')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Restore intended URL after successful authentication
    const redirectTo = getIntendedUrl('/dashboard')

    res.status(200).json({
      success: true,
      token,
      redirectTo,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) { next(err) }
}

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    res.status(201).json({ success: true, data: user })
  } catch (err) { next(err) }
}

const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' })
}

const refreshToken = async (req, res, next) => {
  try {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.status(200).json({ success: true, token })
  } catch (err) { next(err) }
}

module.exports = { login, register, logout, refreshToken }
