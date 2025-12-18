const express = require('express')
const { createWorkout, getWorkout, history } = require('../controllers/workoutController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, createWorkout)
router.get('/history', authMiddleware, history)
router.get('/:id', authMiddleware, getWorkout)

module.exports = router

