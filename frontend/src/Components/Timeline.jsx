// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Calendar, 
//   AlertTriangle, 
//   Shield, 
//   MapPin, 
//   CheckCircle, 
//   XCircle,
//   Filter
// } from 'lucide-react';

// const Timeline = () => {
//   const [timeline, setTimeline] = useState([]);
//   const [metrics, setMetrics] = useState({
//     totalIncidents: 0,
//     threatLevelBreakdown: {},
//     solvedStatus: {
//       solved: 0,
//       unsolved: 0
//     }
//   });
//   const [filters, setFilters] = useState({
//     startDate: '',
//     endDate: '',
//     threatLevel: '',
//     sector: '',
//     incidentType: ''
//   });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filterOptions, setFilterOptions] = useState({
//     locations: [],
//     sectors: [],
//     incidentTypes: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch filter options and initial timeline
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         // Fetch filter options
//         const optionsResponse = await axios.get('http://localhost:5000/api/incidents', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         // Fetch initial timeline
//         const timelineResponse = await axios.get('http://localhost:5000/api/incidents/advanced-timeline', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         setFilterOptions({
//           locations: [...new Set(timelineResponse.data.timeline.map(inc => inc.Location))],
//           sectors: [...new Set(timelineResponse.data.timeline.map(inc => inc.Sector))],
//           incidentTypes: [...new Set(timelineResponse.data.timeline.map(inc => inc.Incident_Type))]
//         });

//         setTimeline(timelineResponse.data.timeline);
//         setMetrics(timelineResponse.data.metrics);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//         setError('Failed to load incident data');
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   // Fetch timeline when filters change
//   useEffect(() => {
//     const fetchFilteredTimeline = async () => {
//       try {
//         setLoading(true);
//         const queryParams = new URLSearchParams(
//           Object.fromEntries(
//             Object.entries(filters).filter(([_, v]) => v !== '')
//           )
//         ).toString();

//         const response = await axios.get(
//           `http://localhost:5000/api/incidents/advanced-timeline?${queryParams}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           }
//         );

//         setTimeline(response.data.timeline);
//         setMetrics(response.data.metrics);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching filtered timeline:', error);
//         setError('Failed to load filtered incidents');
//         setLoading(false);
//       }
//     };

//     fetchFilteredTimeline();
//   }, [filters]);

//   const renderThreatLevelBadge = (level) => {
//     const badgeColors = {
//       'Low': 'bg-green-600',
//       'Medium': 'bg-yellow-600',
//       'High': 'bg-orange-600',
//       'Critical': 'bg-red-600'
//     };

//     return (
//       <span className={`px-2 py-1 rounded text-xs text-white ${badgeColors[level] || 'bg-gray-600'}`}>
//         {level}
//       </span>
//     );
//   };

//   const renderMetrics = () => {
//     return (
//       <div className="grid md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h3 className="text-green-500 font-bold mb-2">Total Incidents</h3>
//           <p className="text-green-400">{metrics.totalIncidents}</p>
//         </div>
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h3 className="text-green-500 font-bold mb-2">Threat Level Breakdown</h3>
//           {Object.entries(metrics.threatLevelBreakdown).map(([level, count]) => (
//             <div key={level} className="text-green-400">
//               {level}: {count}
//             </div>
//           ))}
//         </div>
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h3 className="text-green-500 font-bold mb-2">Solved Status</h3>
//           <div className="text-green-400">
//             Solved: {metrics.solvedStatus.solved}
//           </div>
//           <div className="text-green-400">
//             Unsolved: {metrics.solvedStatus.unsolved}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-black text-green-400 min-h-screen p-8">
//       <div className="container mx-auto max-w-6xl">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-4xl font-bold text-green-500 tracking-wider">
//             Incident Nexus
//           </h1>
//           <button 
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className="bg-green-700 hover:bg-green-600 text-white p-2 rounded-full transition-all flex items-center"
//           >
//             <Filter className="mr-2" /> Filters
//           </button>
//         </div>

//         {/* Metrics Section */}
//         {renderMetrics()}

//         {/* Enhanced Filters */}
//         <div className={`
//           transform transition-all duration-300 ease-in-out overflow-hidden
//           ${isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
//           bg-gray-900 p-4 rounded-lg mb-6
//         `}>
//           <div className="grid md:grid-cols-3 gap-4">
//             <input 
//               type="date" 
//               placeholder="Start Date" 
//               className="bg-gray-800 text-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={filters.startDate}
//               onChange={(e) => setFilters({...filters, startDate: e.target.value})}
//             />
//             <input 
//               type="date" 
//               placeholder="End Date" 
//               className="bg-gray-800 text-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={filters.endDate}
//               onChange={(e) => setFilters({...filters, endDate: e.target.value})}
//             />
//             <select 
//               className="bg-gray-800 text-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={filters.threatLevel}
//               onChange={(e) => setFilters({...filters, threatLevel: e.target.value})}
//             >
//               <option value="" className="bg-black">Threat Level</option>
//               {['Low', 'Medium', 'High', 'Critical'].map(level => (
//                 <option key={level} value={level} className="bg-black">{level}</option>
//               ))}
//             </select>
//             <select 
//               className="bg-gray-800 text-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={filters.sector}
//               onChange={(e) => setFilters({...filters, sector: e.target.value})}
//             >
//               <option value="" className="bg-black">Sector</option>
//               {filterOptions.sectors.map((sector) => (
//                 <option key={sector} value={sector} className="bg-black">{sector}</option>
//               ))}
//             </select>
//             <select 
//               className="bg-gray-800 text-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={filters.incidentType}
//               onChange={(e) => setFilters({...filters, incidentType: e.target.value})}
//             >
//               <option value="" className="bg-black">Incident Type</option>
//               {filterOptions.incidentTypes.map((type) => (
//                 <option key={type} value={type} className="bg-black">{type}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Loading and Error States */}
//         {loading && (
//           <div className="text-center text-green-300 py-10">
//             Loading incidents...
//           </div>
//         )}

//         {error && (
//           <div className="text-center text-red-500 py-10">
//             {error}
//           </div>
//         )}

//         {/* Timeline Events */}
//         {!loading && timeline.length === 0 ? (
//           <div className="text-center text-green-300 py-10">
//             No incidents found matching the current filters.
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {timeline.map((incident) => (
//               <div 
//                 key={incident.Incident_ID} 
//                 className="
//                   bg-gray-900 p-6 rounded-lg border border-green-800 
//                   hover:border-green-600 transition-all 
//                   hover:shadow-lg hover:scale-[1.02]
//                   group cursor-pointer
//                 "
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h2 className="text-xl font-bold text-green-500 mb-2">
//                       {incident.Incident_ID}
//                     </h2>
//                     <h3 className="text-green-300 opacity-80">
//                       {incident.Incident_Type}
//                     </h3>
//                   </div>
//                   {renderThreatLevelBadge(incident.Threat_Level)}
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-3 text-green-300 mb-4">
//                   {[
//                     { icon: Calendar, text: new Date(incident.Date).toLocaleDateString() },
//                     { icon: Shield, text: incident.Sector },
//                     { icon: AlertTriangle, text: incident.Incident_Type },
//                     { icon: MapPin, text: incident.Location }
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-center space-x-2">
//                       <item.icon className="text-green-600" size={18} />
//                       <span className="truncate">{item.text}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <p className="text-green-400 mb-4 line-clamp-2">
//                   {incident.Description}
//                 </p>

//                 <div className="flex items-center space-x-2">
//                   {incident.Incident_Solved ? (
//                     <>
//                       <CheckCircle className="text-green-600" size={18} />
//                       <span className="text-green-500">Solved</span>
//                     </>
//                   ) : (
//                     <>
//                       <XCircle className="text-red-600" size={18} />
//                       <span className="text-red-500">Not Solved</span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Timeline;


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