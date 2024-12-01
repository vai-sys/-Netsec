import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const IncidentMapView = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: '/marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: '/marker-shadow.png',
    shadowSize: [32, 32]
  });

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/incidents/map', {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="bg-gray-900 rounded-2xl shadow-2xl border-2 border-green-600 p-4 transform transition-all hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center tracking-wider">
          Incident Geospatial Visualization
        </h2>
        
        <MapContainer 
          center={[0, 0]} 
          zoom={2} 
          className="h-[600px] rounded-xl shadow-lg border-4 border-green-700"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {incidents.map((incident, index) => (
            <Marker 
              key={index} 
              position={incident.Coordinates.coordinates.reverse()} 
              icon={customIcon}
            >
              <Popup className="bg-black text-green-500 border-2 border-green-600 rounded-xl">
                <div className="p-3">
                  <h3 className="font-bold text-xl text-green-400 mb-2">{incident.Location}</h3>
                  <p className="text-green-300">{incident.Description}</p>
                  <div className="mt-2 text-sm text-green-200">
                    <p>Platform: {incident.Platform}</p>
                    <p>Threat Level: {incident.Threat_Level}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default IncidentMapView;