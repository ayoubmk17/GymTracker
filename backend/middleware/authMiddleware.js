const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const secret = process.env.JWT_SECRET
    if (!secret) {
      return res.status(500).json({ message: 'JWT secret not configured' })
    }
    const decoded = jwt.verify(token, secret)
    const user = await User.findById(decoded.id).select('_id name email')
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.user = { id: user._id.toString(), name: user.name, email: user.email }
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = { authMiddleware }

