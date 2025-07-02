import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

const API_URL = 'http://localhost:5000/api';


const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data.todos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setAlert({ type: 'error', message: 'Failed to fetch todos' });
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setAlert({ type: 'error', message: 'Title is required' });
      return;
    }

    try {
      if (editingTodo) {
        const response = await axios.put(`${API_URL}/todos/${editingTodo._id}`, formData);
        setTodos(todos.map(todo => 
          todo._id === editingTodo._id ? response.data.todo : todo
        ));
        setAlert({ type: 'success', message: 'Todo updated successfully!' });
        setEditingTodo(null);
      } else {
        const response = await axios.post(`${API_URL}/todos`, formData);
        setTodos([response.data.todo, ...todos]);
        setAlert({ type: 'success', message: 'Todo created successfully!' });
        setShowAddForm(false);
      }

      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    } catch (error) {
      console.error('Error saving todo:', error);
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to save todo' });
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await axios.delete(`${API_URL}/todos/${todoId}`);
        setTodos(todos.filter(todo => todo._id !== todoId));
        setAlert({ type: 'success', message: 'Todo deleted successfully!' });
      } catch (error) {
        console.error('Error deleting todo:', error);
        setAlert({ type: 'error', message: 'Failed to delete todo' });
      }
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${todo._id}`, {
        ...todo,
        completed: !todo.completed
      });
      setTodos(todos.map(t => 
        t._id === todo._id ? response.data.todo : t
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
      setAlert({ type: 'error', message: 'Failed to update todo' });
    }
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Todos</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Add Todo Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add New Todo'}
        </button>
      </div>

      {/* Add/Edit Todo Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingTodo ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter todo title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter todo description (optional)"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                {editingTodo ? 'Update Todo' : 'Add Todo'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Todos List */}
      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No todos yet. Create your first todo to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className={`bg-white rounded-lg shadow-md p-6 ${todo.completed ? 'opacity-75' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                    >
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {todo.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}
                      >
                        {todo.priority} priority
                      </span>
                      {todo.dueDate && (
                        <span className="text-xs text-gray-500">
                          Due: {formatDate(todo.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
