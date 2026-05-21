const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  if (authHeader !== 'Bearer demo-token') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  return next()
}

module.exports = { authMiddleware }

