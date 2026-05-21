const express = require('express')
const { listTasks, createTask } = require('../controllers/taskController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)
router.get('/', listTasks)
router.post('/', createTask)

module.exports = router

