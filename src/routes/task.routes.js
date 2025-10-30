
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// GET all tasks
router.get('/', taskController.getTasks);

// POST a new task
router.post('/', taskController.createTask);

// GET a single task by ID
router.get('/:id', taskController.getTaskById);

// PUT to update a task by ID
router.put('/:id', taskController.updateTask);

// DELETE a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
