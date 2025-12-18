const express = require('express')
const { createPlan, listPlans, getPlan, deletePlan } = require('../controllers/planController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, createPlan)
router.get('/', authMiddleware, listPlans)
router.get('/:id', authMiddleware, getPlan)
router.delete('/:id', authMiddleware, deletePlan)

module.exports = router

