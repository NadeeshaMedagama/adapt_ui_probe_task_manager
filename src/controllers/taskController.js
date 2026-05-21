const Task = require('../models/Task')

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignee: req.user._id })
      .populate('assignee', 'name email')
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: tasks.length, data: tasks })
  } catch (err) { next(err) }
}

const createTask = async (req, res, next) => {
  try {
    // Line 47 — This function needs a unit test
    const task = await Task.create({
      ...req.body,
      reporter: req.user._id
    })
    res.status(201).json({ success: true, data: task })
  } catch (err) { next(err) }
}

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.status(200).json({ success: true, data: task })
  } catch (err) { next(err) }
}

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    )
    res.status(200).json({ success: true, data: task })
  } catch (err) { next(err) }
}

const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, data: {} })
  } catch (err) { next(err) }
}

module.exports = { getAllTasks, createTask, getTaskById, updateTask, deleteTask }
