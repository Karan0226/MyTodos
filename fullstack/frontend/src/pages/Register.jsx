import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters' });
      setLoading(false);
      return;
    }

    const result = await register(name, email, password);
    
    if (result.success) {
      setAlert({ type: 'success', message: result.message });
    } else {
      setAlert({ type: 'error', message: result.message });
    }
    
    setLoading(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-sm text-gray-500 mt-1">Join and manage your tasks easily.</p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="Full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            placeholder="Confirm password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
