// import React, { useState, useEffect } from 'react';
// import { 
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
//   PieChart, Pie, Cell, 
//   RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
//   ComposedChart, Line, Area 
// } from 'recharts';
// import { 
//   ShieldAlert, TrendingUp, AlertTriangle, AlertCircle, 
//   BarChart3, PieChart as PieChartIcon 
// } from 'lucide-react';

// const SectorThreatAnalysisDashboard = () => {
//   const [sectorData, setSectorData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSectorData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/incidents/sector-threat-analysis', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch sector threat analysis');
//         }

//         const responseData = await response.json();
//         setSectorData(responseData.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching sector data:', error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchSectorData();
//   }, []); // Empty dependency array ensures it only runs once on mount

//   // Error and Loading States
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-red-500 flex flex-col justify-center items-center p-8">
//         <AlertCircle className="w-24 h-24 mb-4 text-red-600 animate-pulse" />
//         <h1 className="text-3xl font-bold mb-4 text-red-400">Threat Analysis Error</h1>
//         <p className="text-xl text-center text-red-300">{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           disabled={loading} // Disable retry while loading
//           className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition transform hover:scale-105"
//         >
//           {loading ? 'Retrying...' : 'Retry Fetch'}
//         </button>
//       </div>
//     );
//   }

//   // Loading State
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black to-gray-900 text-green-400">
//         <div className="animate-pulse text-2xl flex items-center">
//           <ShieldAlert className="mr-4 animate-bounce w-12 h-12" />
//           Loading Threat Analysis...
//         </div>
//       </div>
//     );
//   }

//   // Prepare data for visualization
//   const threatLevelColors = {
//     'Low': '#10B981',      // Green
//     'Medium': '#FBBF24',   // Amber
//     'High': '#F87171',     // Red
//     'Critical': '#EF4444'  // Dark Red
//   };

//   // Aggregate threat level data across all sectors
//   const aggregatedThreatLevels = sectorData.reduce((acc, sector) => {
//     sector.threatLevels.forEach(level => {
//       const existingLevel = acc.find(item => item.level === level.level);
//       if (existingLevel) {
//         existingLevel.totalIncidents += level.totalIncidents;
//         existingLevel.unsolvedIncidents += level.unsolvedIncidents;
//       } else {
//         acc.push({
//           level: level.level,
//           totalIncidents: level.totalIncidents,
//           unsolvedIncidents: level.unsolvedIncidents,
//           color: threatLevelColors[level.level]
//         });
//       }
//     });
//     return acc;
//   }, []);

//   // Sector-wise total incidents for bar chart
//   const sectorIncidentsData = sectorData.map(sector => ({
//     sector: sector.sector,
//     totalIncidents: sector.totalSectorIncidents,
//     criticalIncidents: sector.threatLevels.find(l => l.level === 'Critical')?.totalIncidents || 0
//   })).sort((a, b) => b.totalIncidents - a.totalIncidents);

//   // Detailed threat level data for radar chart
//   const radarData = sectorData.map(sector => ({
//     sector: sector.sector,
//     Low: sector.threatLevels.find(l => l.level === 'Low')?.totalIncidents || 0,
//     Medium: sector.threatLevels.find(l => l.level === 'Medium')?.totalIncidents || 0,
//     High: sector.threatLevels.find(l => l.level === 'High')?.totalIncidents || 0,
//     Critical: sector.threatLevels.find(l => l.level === 'Critical')?.totalIncidents || 0
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-green-400 p-8 space-y-8">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-green-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
//           Sector Threat Intelligence
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Threat Level Pie Chart */}
//         <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-green-800">
//           <h2 className="text-2xl font-semibold mb-4 flex items-center">
//             <PieChartIcon className="mr-2" /> Threat Level Distribution
//           </h2>
//           <PieChart width={400} height={300}>
//             <Pie
//               data={aggregatedThreatLevels}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={120}
//               fill="#8884d8"
//               dataKey="totalIncidents"
//             >
//               {aggregatedThreatLevels.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip 
//               contentStyle={{ 
//                 backgroundColor: '#111827', 
//                 borderColor: '#10B981',
//                 color: '#10B981'
//               }} 
//             />
//             <Legend 
//               iconType="circle"
//               iconSize={10}
//               wrapperStyle={{ color: '#10B981' }}
//             />
//           </PieChart>
//         </div>

//         {/* Sector Incidents Composed Chart */}
//         <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-green-800">
//           <h2 className="text-2xl font-semibold mb-4 flex items-center">
//             <BarChart3 className="mr-2" /> Sector Total Incidents
//           </h2>
//           <ComposedChart width={400} height={300} data={sectorIncidentsData}>
//             <XAxis dataKey="sector" stroke="#10B981" />
//             <YAxis stroke="#10B981" />
//             <Tooltip 
//               contentStyle={{ 
//                 backgroundColor: '#111827', 
//                 borderColor: '#10B981',
//                 color: '#10B981'
//               }} 
//             />
//             <Area dataKey="totalIncidents" fill="#10B981" fillOpacity={0.3} />
//             <Bar dataKey="criticalIncidents" barSize={20} fill="#EF4444" />
//             <Line type="monotone" dataKey="totalIncidents" stroke="#FBBF24" />
//           </ComposedChart>
//         </div>

//         {/* Radar Chart for Comprehensive Threat Analysis */}
//         <div className="md:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-green-800">
//           <h2 className="text-2xl font-semibold mb-4 flex items-center">
//             <AlertTriangle className="mr-2" /> Comprehensive Sector Threat Radar
//           </h2>
//           <RadarChart 
//             cx="50%" 
//             cy="50%" 
//             outerRadius={150} 
//             width={600} 
//             height={400} 
//             data={radarData}
//           >
//             <PolarGrid stroke="#10B981" />
//             <PolarAngleAxis dataKey="sector" stroke="#10B981" />
//             <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#10B981" />
//             <Radar 
//               name="Low"
//               dataKey="Low"
//               stroke="#10B981"
//               fill="#10B981"
//               fillOpacity={0.6}
//             />
//             <Radar 
//               name="Medium"
//               dataKey="Medium"
//               stroke="#FBBF24"
//               fill="#FBBF24"
//               fillOpacity={0.6}
//             />
//             <Radar 
//               name="High"
//               dataKey="High"
//               stroke="#F87171"
//               fill="#F87171"
//               fillOpacity={0.6}
//             />
//             <Radar 
//               name="Critical"
//               dataKey="Critical"
//               stroke="#EF4444"
//               fill="#EF4444"
//               fillOpacity={0.6}
//             />
//           </RadarChart>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SectorThreatAnalysisDashboard;

import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import { 
  ShieldAlert, AlertCircle
} from 'lucide-react';

const SectorThreatAnalysisDashboard = () => {
  const [sectorData, setSectorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/incidents/sector-threat-analysis', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch sector threat analysis');
        }

        const responseData = await response.json();
        setSectorData(responseData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSectorData();
  }, []);

  // Error and Loading States
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-red-500 flex flex-col justify-center items-center p-8">
        <AlertCircle className="w-24 h-24 mb-4 text-red-600 animate-pulse" />
        <h1 className="text-3xl font-bold mb-4 text-red-400">Threat Analysis Error</h1>
        <p className="text-xl text-center text-red-300">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition transform hover:scale-105"
        >
          Retry Fetch
        </button>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black to-gray-900 text-green-400">
        <div className="animate-pulse text-2xl flex items-center">
          <ShieldAlert className="mr-4 animate-bounce w-12 h-12" />
          Loading Threat Analysis...
        </div>
      </div>
    );
  }

  // Prepare threat level distribution data
  const threatLevelColors = {
    'Low': '#10B981',      // Green
    'Medium': '#FBBF24',   // Amber
    'High': '#F87171',     // Red
    'Critical': '#EF4444'  // Dark Red
  };

  // Aggregate threat level data
  const threatLevelDistribution = sectorData.reduce((acc, sector) => {
    sector.threatLevels.forEach(level => {
      const existingLevel = acc.find(item => item.level === level.level);
      if (existingLevel) {
        existingLevel.totalIncidents += level.totalIncidents;
        existingLevel.unsolvedIncidents += level.unsolvedIncidents;
      } else {
        acc.push({
          level: level.level,
          totalIncidents: level.totalIncidents,
          unsolvedIncidents: level.unsolvedIncidents,
          color: threatLevelColors[level.level]
        });
      }
    });
    return acc;
  }, []);

  // Custom Tooltip for Threat Level Distribution
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-green-600">
          <p className="text-green-300 font-bold">{data.level} Threat Level</p>
          <p className="text-white">Total Incidents: {data.totalIncidents}</p>
          <p className="text-red-400">Unsolved Incidents: {data.unsolvedIncidents}</p>
          <p className="text-yellow-300">Incident Percentage: {((data.totalIncidents / sectorData.reduce((sum, sector) => sum + sector.totalSectorIncidents, 0)) * 100).toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-green-400 p-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          Sector Threat Intelligence
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-green-800 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <ShieldAlert className="mr-2" /> Threat Level Distribution
          </h2>
          
          <PieChart width={600} height={400}>
            <Pie
              data={threatLevelDistribution}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={150}
              fill="#8884d8"
              dataKey="totalIncidents"
              label={({ level, totalIncidents, percent }) => `${level}: ${totalIncidents} (${(percent * 100).toFixed(2)}%)`}
            >
              {threatLevelDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value, entry) => (
                <span className="text-white">
                  {value} Threat: {entry.payload.totalIncidents} Incidents
                </span>
              )}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default SectorThreatAnalysisDashboard;