import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, User, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) 
      newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) 
      newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'user' // Default role
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        navigate('/login');
      } else {
        // Handle registration error
        setErrors({ submit: data.message || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl border-4 border-green-600 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-green-500 tracking-wider">
            Register
          </h2>
          <p className="text-green-300 mt-2">
            Create your Cyber Shield account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <User />
            </div>
            <input 
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-800 border-2 rounded-xl text-green-300 
                ${errors.name ? 'border-red-500' : 'border-green-600'}
                focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertTriangle size={16} className="mr-2" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <Mail />
            </div>
            <input 
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-800 border-2 rounded-xl text-green-300 
                ${errors.email ? 'border-red-500' : 'border-green-600'}
                focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertTriangle size={16} className="mr-2" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <Lock />
            </div>
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-800 border-2 rounded-xl text-green-300 
                ${errors.password ? 'border-red-500' : 'border-green-600'}
                focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertTriangle size={16} className="mr-2" /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <ShieldCheck />
            </div>
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-800 border-2 rounded-xl text-green-300 
                ${errors.confirmPassword ? 'border-red-500' : 'border-green-600'}
                focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertTriangle size={16} className="mr-2" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-900 text-red-300 p-3 rounded-xl flex items-center">
              <AlertTriangle className="mr-2" />
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-green-700 text-black font-bold rounded-xl 
              hover:bg-green-600 transition-colors duration-300 
              flex items-center justify-center
              transform hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-black"></div>
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <Link 
            to="/login" 
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            Already have an account? Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;