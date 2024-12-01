import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const CreateIncidentPage = () => {
  const [incidentData, setIncidentData] = useState({
    Platform: '',
    Sector: '',
    Incident_Type: '',
    Threat_Level: '',
    Location: '',
    Description: '',
    Summary: '',
    Coordinates: { 
      type: 'Point', 
      coordinates: [0, 0] 
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/incidents', incidentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Add success notification
    } catch (error) {
      console.error('Failed to create incident', error);
      // Add error handling
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4">
      <div className="bg-cyber-gray border border-cyber-green rounded-lg shadow-neon-green p-8 w-full max-w-2xl transform transition hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <PlusCircleIcon className="h-16 w-16 text-cyber-green animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-cyber-green text-center mb-6">
          Create New Incident
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <select 
              name="Platform"
              value={incidentData.Platform}
              onChange={handleChange}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
            >
              <option value="">Select Platform</option>
              <option value="Web">Web</option>
              <option value="Mobile">Mobile</option>
              <option value="Network">Network</option>
            </select>
            <select 
              name="Sector"
              value={incidentData.Sector}
              onChange={handleChange}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
            >
              <option value="">Select Sector</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <select 
              name="Incident_Type"
              value={incidentData.Incident_Type}
              onChange={handleChange}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
            >
              <option value="">Incident Type</option>
              <option value="Malware">Malware</option>
              <option value="Phishing">Phishing</option>
              <option value="DDoS">DDoS Attack</option>
            </select>
            <select 
              name="Threat_Level"
              value={incidentData.Threat_Level}
              onChange={handleChange}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
            >
              <option value="">Threat Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <input 
            type="text"
            name="Location"
            placeholder="Location"
            value={incidentData.Location}
            onChange={handleChange}
            className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
          />
          <textarea 
            name="Description"
            placeholder="Incident Description"
            value={incidentData.Description}
            onChange={handleChange}
            className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green h-32"
          />
          <textarea 
            name="Summary"
            placeholder="Incident Summary"
            value={incidentData.Summary}
            onChange={handleChange}
            className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green h-24"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              type="number"
              name="coordinates.0"
              placeholder="Longitude"
              value={incidentData.Coordinates.coordinates[0]}
              onChange={(e) => {
                const newCoords = [...incidentData.Coordinates.coordinates];
                newCoords[0] = parseFloat(e.target.value);
                setIncidentData(prev => ({
                  ...prev,
                  Coordinates: { 
                    ...prev.Coordinates, 
                    coordinates: newCoords 
                  }
                }));
              }}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
            />
            <input 
              type="number"
              name="coordinates.1"
              placeholder="Latitude"
              value={incidentData.Coordinates.coordinates[1]}
              onChange={(e) => {
                const newCoords = [...incidentData.Coordinates.coordinates];
                newCoords[1] = parseFloat(e.target.value);
                setIncidentData(prev => ({
                  ...prev,
                  Coordinates: { 
                    ...prev.Coordinates, 
                    coordinates: newCoords 
                  }
                }));
              }}
              className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-cyber-green text-cyber-black py-3 rounded font-bold hover:bg-cyber-light-green transition duration-300 transform hover:scale-105 shadow-neon-green"
          >
            Create Incident
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIncidentPage;