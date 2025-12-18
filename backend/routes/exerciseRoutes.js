const express = require('express')
const { listExercises, getExercise, createExercise } = require('../controllers/exerciseController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', listExercises)
router.get('/:id', getExercise)
router.post('/', authMiddleware, createExercise)

module.exports = router
