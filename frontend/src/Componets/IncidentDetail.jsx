import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  Check, 
  Globe, 
  FileText 
} from 'lucide-react';

const IncidentDetailsPage = () => {
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchIncidentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/incidents/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setIncident(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching incident details:', error);
        setLoading(false);
      }
    };

    fetchIncidentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-500">
        Incident not found
      </div>
    );
  }

  const getThreatLevelColor = () => {
    switch(incident.Threat_Level) {
      case 'High': return 'bg-red-900 text-red-300 border-red-600';
      case 'Medium': return 'bg-yellow-900 text-yellow-300 border-yellow-600';
      case 'Low': return 'bg-green-900 text-green-300 border-green-600';
      default: return 'bg-gray-900 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="bg-black min-h-screen p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-900 rounded-3xl shadow-2xl border-4 border-green-600 p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-green-500 tracking-wider">
            Incident Details
          </h2>
          <div className={`px-4 py-2 rounded-full ${getThreatLevelColor()} flex items-center`}>
            <AlertTriangle className="mr-2" />
            {incident.Threat_Level} Threat
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <DetailItem 
              icon={<Shield className="text-green-500" />} 
              label="Incident ID" 
              value={incident.Incident_ID} 
            />
            <DetailItem 
              icon={<Calendar className="text-green-500" />} 
              label="Date" 
              value={new Date(incident.Date).toLocaleDateString()} 
            />
            <DetailItem 
              icon={<Globe className="text-green-500" />} 
              label="Platform" 
              value={incident.Platform} 
            />
            <DetailItem 
              icon={<MapPin className="text-green-500" />} 
              label="Location" 
              value={incident.Location} 
            />
          </div>
          
          <div className="space-y-4">
            <DetailItem 
              icon={<FileText className="text-green-500" />} 
              label="Incident Type" 
              value={incident.Incident_Type} 
            />
            <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-green-600">
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Description
              </h3>
              <p className="text-green-200">{incident.Description}</p>
            </div>
            <DetailItem 
              icon={<Check className="text-green-500" />} 
              label="Incident Status" 
              value={incident.Incident_Solved ? 'Resolved' : 'Ongoing'} 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center bg-gray-800 p-4 rounded-xl border-l-4 border-green-600">
    <div className="mr-4">{icon}</div>
    <div>
      <p className="text-green-400 font-semibold">{label}</p>
      <p className="text-green-200">{value}</p>
    </div>
  </div>
);

export default IncidentDetailsPage;