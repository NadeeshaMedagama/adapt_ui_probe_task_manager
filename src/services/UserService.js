
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
