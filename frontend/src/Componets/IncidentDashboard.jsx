import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExclamationTriangleIcon, ChartBarIcon } from '@heroicons/react/24/solid';

const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [solvedIncidents, setSolvedIncidents] = useState(0);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incidents', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setIncidents(response.data);
        setTotalIncidents(response.data.length);
        setSolvedIncidents(response.data.filter(inc => inc.Incident_Solved).length);
      } catch (error) {
        console.error('Failed to fetch incidents', error);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-green p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cyber-gray rounded-lg p-6 shadow-3d animate-float">
            <div className="flex items-center justify-between">
              <ExclamationTriangleIcon className="h-12 w-12 text-cyber-green" />
              <div>
                <h3 className="text-2xl font-bold">{totalIncidents}</h3>
                <p className="text-sm text-gray-400">Total Incidents</p>
              </div>
            </div>
          </div>
          <div className="bg-cyber-gray rounded-lg p-6 shadow-3d animate-float">
            <div className="flex items-center justify-between">
              <ChartBarIcon className="h-12 w-12 text-cyber-green" />
              <div>
                <h3 className="text-2xl font-bold">{solvedIncidents}</h3>
                <p className="text-sm text-gray-400">Solved Incidents</p>
              </div>
            </div>
          </div>
          {/* More dashboard cards */}
        </div>

        <div className="mt-8 bg-cyber-gray rounded-lg p-6 shadow-neon-green">
          <h2 className="text-2xl font-bold mb-4">Recent Incidents</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyber-green">
                <th className="py-2 text-left">Incident ID</th>
                <th className="py-2 text-left">Platform</th>
                <th className="py-2 text-left">Threat Level</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {incidents.slice(0, 5).map((incident) => (
                <tr key={incident._id} className="hover:bg-cyber-dark-green transition">
                  <td className="py-2">{incident.Incident_ID}</td>
                  <td className="py-2">{incident.Platform}</td>
                  <td className="py-2">{incident.Threat_Level}</td>
                  <td className="py-2">
                    <span className={`
                      px-2 py-1 rounded text-xs 
                      ${incident.Incident_Solved ? 'bg-green-600' : 'bg-red-600'}
                    `}>
                      {incident.Incident_Solved ? 'Solved' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentDashboard;