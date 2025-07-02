const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/todos
// @desc    Get all todos for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: todos.length,
      todos
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = await Todo.create({
      title,
      description,
      priority,
      dueDate,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo
    });
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this todo' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority, dueDate },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Todo updated successfully',
      todo
    });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this todo' });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;