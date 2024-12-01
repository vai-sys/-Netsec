import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IncidentTimelineView = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/incidents/timeline', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setIncidents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const getThreatLevelColor = (level) => {
    switch(level) {
      case 'High': return 'border-red-600';
      case 'Medium': return 'border-yellow-600';
      case 'Low': return 'border-green-600';
      default: return 'border-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-900 rounded-3xl shadow-2xl border-2 border-green-600 p-6"
      >
        <h2 className="text-4xl font-bold text-green-500 mb-10 text-center tracking-wider">
          Incident Chronology
        </h2>
        <div className="relative border-l-4 border-green-800">
          {incidents.map((incident, index) => (
            <motion.div
              key={incident._id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`mb-8 ml-10 p-6 bg-gray-800 rounded-2xl shadow-lg border-l-8 ${getThreatLevelColor(incident.Threat_Level)}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-green-400">
                  {incident.Location}
                </h3>
                <span className="text-green-300 font-mono">
                  {new Date(incident.Date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-green-200 mb-4">{incident.Description}</p>
              <div className="flex justify-between">
                <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full">
                  {incident.Incident_Type}
                </span>
                <span className={`px-3 py-1 rounded-full ${
                  incident.Threat_Level === 'High' 
                    ? 'bg-red-900 text-red-300' 
                    : incident.Threat_Level === 'Medium'
                    ? 'bg-yellow-900 text-yellow-300'
                    : 'bg-green-900 text-green-300'
                }`}>
                  {incident.Threat_Level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default IncidentTimelineView;