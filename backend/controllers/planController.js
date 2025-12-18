const Plan = require('../models/Plan')

const createPlan = async (req, res) => {
  const { name, exercises } = req.body
  if (!name || !Array.isArray(exercises)) {
    return res.status(400).json({ message: 'Invalid payload' })
  }
  const plan = await Plan.create({ userId: req.user.id, name, exercises })
  res.status(201).json(plan)
}

const listPlans = async (req, res) => {
  const plans = await Plan.find({ userId: req.user.id }).sort({ createdAt: -1 })
  res.json(plans)
}

const getPlan = async (req, res) => {
  const { id } = req.params
  const plan = await Plan.findOne({ _id: id, userId: req.user.id })
  if (!plan) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.json(plan)
}

const deletePlan = async (req, res) => {
  const { id } = req.params
  const plan = await Plan.findOneAndDelete({ _id: id, userId: req.user.id })
  if (!plan) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.json({ ok: true })
}

module.exports = { createPlan, listPlans, getPlan, deletePlan }

