import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User, Mail, ShieldCheck, RefreshCw } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch profile. Please try again later.';
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-500 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="animate-spin" />
          <span>Loading Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      <div className="max-w-2xl mx-auto bg-green-900/20 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-green-500 text-center">
          User Profile
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="relative">
              <label className="block mb-2 text-green-500 flex items-center">
                <User className="mr-2" />
                Name
              </label>
              <div className="bg-green-900/30 p-3 rounded-lg text-green-300">
                {profile.name}
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="mb-2 text-green-500 flex items-center">
                <Mail className="mr-2" />
                Email
              </label>
              <div className="bg-green-900/30 p-3 rounded-lg text-green-300">
                {profile.email}
              </div>
            </div>
          </div>

          {/* Role Field */}
          <div className="relative">
            <label className="block mb-2 text-green-500  items-center">
              <ShieldCheck className="mr-2" />
              Role
            </label>
            <div className="bg-green-900/30 p-3 rounded-lg text-green-300 capitalize">
              {profile.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;