import React, { useState } from 'react';
import axios from 'axios';
import { DocumentPlusIcon } from '@heroicons/react/24/solid';

const CreateReportPage = () => {
  const [reportData, setReportData] = useState({
    Incident_Type: '',
    Threat_Level: '',
    Location: '',
    Description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reports', reportData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Add success notification or redirect here
      setReportData({
        Incident_Type: '',
        Threat_Level: '',
        Location: '',
        Description: '',
      });
    } catch (error) {
      console.error('Failed to create report', error);
      // Add error handling
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4">
      <div className="bg-cyber-gray border border-cyber-green rounded-lg shadow-neon-green p-8 w-full max-w-2xl transform transition hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <DocumentPlusIcon className="h-16 w-16 text-cyber-green animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-cyber-green text-center mb-6">
          Create New Report
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Incident Type</label>
              <select 
                name="Incident_Type"
                value={reportData.Incident_Type}
                onChange={handleChange}
                className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
                required
              >
                <option value="">Select Incident Type</option>
                <option value="Malware">Malware</option>
                <option value="Phishing">Phishing</option>
                <option value="DDoS">DDoS Attack</option>
                <option value="Data Breach">Data Breach</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Threat Level</label>
              <select 
                name="Threat_Level"
                value={reportData.Threat_Level}
                onChange={handleChange}
                className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
                required
              >
                <option value="">Select Threat Level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Location</label>
            <input 
              type="text"
              name="Location"
              value={reportData.Location}
              onChange={handleChange}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
              placeholder="Location of the incident"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea 
              name="Description"
              value={reportData.Description}
              onChange={handleChange}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
              placeholder="Provide a detailed description of the incident"
              rows="4"
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="flex items-center bg-cyber-green text-cyber-black px-6 py-3 rounded hover:bg-cyber-light-green transition"
            >
              <DocumentPlusIcon className="h-5 w-5 mr-2" />
              Create Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReportPage;
