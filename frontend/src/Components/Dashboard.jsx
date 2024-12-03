

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Severity color mapping
  const SEVERITY_COLORS = {
    Low: 'text-green-500',
    Medium: 'text-yellow-500',
    High: 'text-orange-500',
    Critical: 'text-red-500',
  };

  // Status color mapping
  const STATUS_COLORS = {
    Pending: 'text-yellow-500',
    Reviewed: 'text-blue-500',
    'Under Investigation': 'text-orange-500',
    Closed: 'text-green-500',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch incidents
        const incidentsResponse = await fetch('http://localhost:5000/api/incidents', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const incidentsData = await incidentsResponse.json();

        // Fetch reports
        const reportsResponse = await fetch('http://localhost:5000/api/reports', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const reportsData = await reportsResponse.json();

        // Ensure data is in array format
        setIncidents(Array.isArray(incidentsData) ? incidentsData : []);
        setReports(Array.isArray(reportsData) ? reportsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIncidents([]);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  // Severity Analysis
  const severityData = [
    { name: 'Low', value: incidents.filter((i) => i.Threat_Level === 'Low').length },
    { name: 'Medium', value: incidents.filter((i) => i.Threat_Level === 'Medium').length },
    { name: 'High', value: incidents.filter((i) => i.Threat_Level === 'High').length },
    { name: 'Critical', value: incidents.filter((i) => i.Threat_Level === 'Critical').length },
  ];

  // Sector Analysis
  const sectorData = Object.entries(
    incidents.reduce((acc, incident) => {
      acc[incident.Sector] = (acc[incident.Sector] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, incidents]) => ({ name, incidents }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-green-400 min-h-screen p-8"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-green-300">
        Incident Management Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Total Incidents Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 border border-green-700 p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-green-500" />
            <span className="text-green-400 font-semibold">Total Incidents</span>
          </div>
          <div className="text-4xl font-bold text-green-300">{incidents.length}</div>
        </motion.div>

        {/* Total Reports Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 border border-green-700 p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="text-green-500" />
            <span className="text-green-400 font-semibold">Total Reports</span>
          </div>
          <div className="text-4xl font-bold text-green-300">{reports.length}</div>
        </motion.div>

        {/* Solved Incidents Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 border border-green-700 p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="text-green-500" />
            <span className="text-green-400 font-semibold">Solved Incidents</span>
          </div>
          <div className="text-4xl font-bold text-green-300">
            {incidents.filter((i) => i.Incident_Solved).length}
          </div>
        </motion.div>
      </div>

      {/* Incident List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-300">Recent Incidents</h2>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident._id}
              className="bg-gray-900 border border-green-700 p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <div className="text-lg font-semibold text-green-300">{incident.Incident_ID}</div>
                  <div className="text-sm text-green-500">{incident.Date}</div>
                </div>
                <div className={`${SEVERITY_COLORS[incident.Threat_Level]} text-sm`}>
                  {incident.Threat_Level}
                </div>
              </div>
              <div className="text-sm text-green-400">{incident.Description}</div>
              <div className="mt-2 text-sm">
                <span
                  className={`${
                    incident.Incident_Solved ? 'text-green-500' : 'text-red-500'
                  } font-semibold`}
                >
                  {incident.Incident_Solved ? 'Solved' : 'Unresolved'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default IncidentDashboard;

