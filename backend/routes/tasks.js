const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/tasks - Fetching all tasks');
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    console.log('POST /api/tasks - Creating new task:', { title });
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
      [title, false]
    );
    
    const newTask = result.rows[0];
    console.log('Created task:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    console.log(`PUT /api/tasks/${id} - Updating task:`, { completed });

    const result = await pool.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = result.rows[0];
    console.log('Updated task:', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/tasks/${id} - Deleting task`);

    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log(`Task ${id} deleted successfully`);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Get a specific task by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/tasks/${id} - Fetching task by ID`);

    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = result.rows[0];
    console.log('Fetched task:', task);
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Error fetching task' });
  }
});

module.exports = router;
