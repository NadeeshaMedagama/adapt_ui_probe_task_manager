const { addTask, listTasks: listTasksFromStore } = require('../data/store')

const listTasks = (req, res) => {
  res.status(200).json({ tasks: listTasksFromStore() })
}

const createTask = (req, res, next) => {
  try {
    const title = req.body?.title
    if (!title) {
      return res.status(400).json({ message: 'Missing required fields: title' })
    }

    const task = addTask({ title })
    return res.status(201).json({ task })
  } catch (err) {
    return next(err)
  }
}

module.exports = { listTasks, createTask }
