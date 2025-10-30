
const fs = require('fs/promises');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../../tasks.json');

// Helper function to read tasks
const readTasks = async () => {
  try {
    const data = await fs.readFile(tasksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, create it with an empty array
    if (error.code === 'ENOENT') {
      await writeTasks({ tasks: [] });
      return { tasks: [] };
    }
    throw error;
  }
};

// Helper function to write tasks
const writeTasks = async (data) => {
  await fs.writeFile(tasksFilePath, JSON.stringify(data, null, 2), 'utf8');
};

exports.getTasks = async (req, res) => {
  try {
    const data = await readTasks();
    res.status(200).json(data.tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error reading tasks', error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const data = await readTasks();
    const newTask = {
      id: Date.now().toString(),
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    data.tasks.push(newTask);
    await writeTasks(data);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readTasks();
    const task = data.tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error finding task', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const data = await readTasks();
    
    const taskIndex = data.tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = data.tasks[taskIndex];
    
    // Update fields if they are provided
    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    data.tasks[taskIndex] = task;
    await writeTasks(data);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readTasks();
    
    const filteredTasks = data.tasks.filter(t => t.id !== id);

    if (filteredTasks.length === data.tasks.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    data.tasks = filteredTasks;
    await writeTasks(data);

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
