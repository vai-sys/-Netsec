import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserData(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          currentPassword: '',
          newPassword: ''
        });
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEditMode(false);
      // Add success notification
    } catch (error) {
      console.error('Failed to update profile', error);
      // Add error handling
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-cyber-black p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-8">
          <UserCircleIcon className="h-16 w-16 text-cyber-green animate-pulse mr-4" />
          <h2 className="text-3xl font-bold text-cyber-green">
            User Profile
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-cyber-gray rounded-lg p-6 shadow-neon-green">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-cyber-green/20 rounded-full flex items-center justify-center mb-4">
                <UserCircleIcon className="w-24 h-24 text-cyber-green" />
              </div>
              <h3 className="text-2xl font-bold text-cyber-green">
                {userData.name}
              </h3>
              <p className="text-gray-400">{userData.role}</p>
            </div>
          </div>

          <div className="md:col-span-2 bg-cyber-gray rounded-lg p-6 shadow-3d">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full p-3 bg-cyber-black border rounded text-cyber-green 
                      ${editMode ? 'border-cyber-green' : 'border-transparent'}
                    `}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full p-3 bg-cyber-black border rounded text-cyber-green 
                      ${editMode ? 'border-cyber-green' : 'border-transparent'}
                    `}
                  />
                </div>
              </div>

              {editMode && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                    <input 
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                    <input 
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-6 w-6 text-cyber-green" />
                  <span className="text-gray-400">
                    Last Login: {new Date(userData.lastLogin).toLocaleString()}
                  </span>
                </div>
                <div>
                  {!editMode ? (
                    <button 
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="bg-cyber-green text-cyber-black px-4 py-2 rounded hover:bg-cyber-light-green transition flex items-center"
                    >
                      <CogIcon className="h-5 w-5 mr-2" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="space-x-2">
                      <button 
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="bg-cyber-green text-cyber-black px-4 py-2 rounded hover:bg-cyber-light-green transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;