const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' })
  }
  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(409).json({ message: 'Email already in use' })
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await User.create({ name, email, password: hash })
  const token = createToken(user._id)
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const token = createToken(user._id)
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
}

const createToken = id => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is required')
  }
  return jwt.sign({ id }, secret, { expiresIn: '7d' })
}

module.exports = { register, login }

