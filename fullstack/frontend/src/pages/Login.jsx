import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const result = await login(email, password);
    setAlert({
      type: result.success ? 'success' : 'error',
      message: result.message,
    });

    setLoading(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new one
            </Link>
          </p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              autoComplete="email"
              placeholder="Email address"
              className="block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              autoComplete="current-password"
              placeholder="Password"
              className="block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;