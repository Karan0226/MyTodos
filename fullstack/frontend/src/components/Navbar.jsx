import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="text-2xl font-bold tracking-wide">
            <Link
              to="/"
              className="text-teal-600 hover:text-teal-800 transition-colors duration-200"
            >
              MyTodo
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-sm font-medium">Hi, <span className="font-semibold">{user.name}</span></span>
                <button
                  onClick={logout}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-teal-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-gray-200 pt-4">
            {user ? (
              <>
                <span className="text-sm font-medium">Hi, <span className="font-semibold">{user.name}</span></span>
                <button
                  onClick={logout}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-sm text-gray-700 hover:text-teal-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
