const express = require('express')
const { statsVolume, statsExercise, statsFrequency } = require('../controllers/statsController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/volume', authMiddleware, statsVolume)
router.get('/exercise/:exerciseId', authMiddleware, statsExercise)
router.get('/frequency', authMiddleware, statsFrequency)

module.exports = router

