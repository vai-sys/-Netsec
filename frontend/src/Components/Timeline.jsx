


import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

const IncidentTimelineGraph = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidentTimeline = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/incidents/advanced-timeline', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Process the timeline data for the graph
        const processedData = processTimelineData(response.data.timeline);
        setTimelineData(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
        setError('Failed to load incident timeline');
        setLoading(false);
      }
    };

    fetchIncidentTimeline();
  }, []);

  const processTimelineData = (timeline) => {
    // Group incidents by month
    const monthlyIncidents = {};
    
    timeline.forEach(incident => {
      const date = new Date(incident.Date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthlyIncidents[monthKey]) {
        monthlyIncidents[monthKey] = {
          month: monthKey,
          totalIncidents: 0,
          lowThreat: 0,
          mediumThreat: 0,
          highThreat: 0,
          criticalThreat: 0
        };
      }
      
      monthlyIncidents[monthKey].totalIncidents++;
      
      switch(incident.Threat_Level) {
        case 'Low':
          monthlyIncidents[monthKey].lowThreat++;
          break;
        case 'Medium':
          monthlyIncidents[monthKey].mediumThreat++;
          break;
        case 'High':
          monthlyIncidents[monthKey].highThreat++;
          break;
        case 'Critical':
          monthlyIncidents[monthKey].criticalThreat++;
          break;
      }
    });

    // Convert to array and sort
    return Object.values(monthlyIncidents).sort((a, b) => {
      const [aYear, aMonth] = a.month.split('-').map(Number);
      const [bYear, bMonth] = b.month.split('-').map(Number);
      return aYear - bYear || aMonth - bMonth;
    });
  };

  if (loading) return (
    <div className="text-center text-gray-500 p-8">
      Loading timeline graph...
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 p-8">
      {error}
    </div>
  );

  return (
    <div className="bg-black p-8 rounded-lg">
      <h2 className="text-2xl text-green-500 mb-6">Incident Timeline Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="month" 
            stroke="#4ade80" 
            tick={{ fill: '#4ade80' }}
          />
          <YAxis 
            stroke="#4ade80" 
            tick={{ fill: '#4ade80' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              borderColor: '#4ade80' 
            }}
            labelStyle={{ color: '#4ade80' }}
          />
          <Legend 
            wrapperStyle={{ color: '#4ade80' }}
          />
          <Line 
            type="monotone" 
            dataKey="totalIncidents" 
            stroke="#4ade80" 
            strokeWidth={3}
            name="Total Incidents"
          />
          <Line 
            type="monotone" 
            dataKey="lowThreat" 
            stroke="#22c55e" 
            strokeWidth={2}
            name="Low Threat"
          />
          <Line 
            type="monotone" 
            dataKey="mediumThreat" 
            stroke="#eab308" 
            strokeWidth={2}
            name="Medium Threat"
          />
          <Line 
            type="monotone" 
            dataKey="highThreat" 
            stroke="#f97316" 
            strokeWidth={2}
            name="High Threat"
          />
          <Line 
            type="monotone" 
            dataKey="criticalThreat" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Critical Threat"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncidentTimelineGraph;