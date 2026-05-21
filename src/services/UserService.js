/**
 * UserService.js
 * Core business logic for user authentication and management
 */

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * authenticateUser
 * Validates user credentials and returns a signed JWT token
 * @param {string} email - User email address
 * @param {string} password - Plain text password to verify
 * @returns {Object} - { token, user } on success
 */
async function authenticateUser(email, password) {
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new Error('No account found with this email address')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Incorrect password')
  }

  const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

  user.password = undefined
  return { token, user }
}

/**
 * registerUser
 * Creates a new user account with hashed password
 */
async function registerUser(name, email, password, role = 'developer') {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('An account with this email already exists')
  }

  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  })

  user.password = undefined
  return user
}

/**
 * getUserProfile
 * Retrieves full user profile by ID
 */
async function getUserProfile(userId) {
  const user = await User.findById(userId)
      .populate('assignedTasks')
      .populate('projects')

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

/**
 * updateUserProfile
 * Updates user profile fields
 */
async function updateUserProfile(userId, updateData) {
  const allowedFields = ['name', 'bio', 'avatarUrl', 'preferences']
  const filteredData = {}

  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field]
    }
  })

  const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredData },
      { new: true, runValidators: true }
  )

  return updatedUser
}

/**
 * requestPasswordReset
 * Generates a password reset token and sends email
 */
async function requestPasswordReset(email) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('No account found with this email')
  }

  const resetToken = jwt.sign(
      { id: user._id, purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
  )

  return { resetToken, userId: user._id }
}

module.exports = {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset
}
/**
 * deleteUserAccount
 * Permanently removes user account and all associated data
 */
async function deleteUserAccount(userId, password) {
  const user = await User.findById(userId).select('+password')
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error('Incorrect password confirmation')
  await User.findByIdAndDelete(userId)
  return { deleted: true }
}

module.exports = {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  deleteUserAccount
}
