import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { Shield, AlertTriangle, Users } from 'lucide-react';

// Simulate WebSocket for real-time updates
const simulateWebSocket = (callback) => {
  return setInterval(() => {
    // Simulate new phishing attempt detection
    const newPhishingAttempt = {
      date: new Date().toLocaleTimeString(),
      value: Math.floor(Math.random() * 20) + 1
    };

    // Simulate new takedown progress
    const newTakedown = {
      domain: `example${Math.floor(Math.random() * 1000)}.com`,
      status: Math.random() > 0.5 ? 'In Progress' : 'Completed',
      registrar: ['GoDaddy', 'Namecheap', 'Bluehost'][Math.floor(Math.random() * 3)],
      submissionDate: new Date().toLocaleDateString()
    };

    // Simulate new threat alert
    const newThreat = {
      type: ['Phishing Site', 'Fake App', 'Malicious Email'][Math.floor(Math.random() * 3)],
      timestamp: new Date().toLocaleTimeString(),
      severity: Math.random() > 0.5 ? 'High' : 'Medium'
    };

    callback({
      phishingAttempt: newPhishingAttempt,
      takedown: newTakedown,
      threat: newThreat,
      metrics: {
        totalDetected: Math.floor(Math.random() * 50),
        last24h: Math.floor(Math.random() * 10),
        casesHandled: Math.floor(Math.random() * 5),
        escalationTime: Math.floor(Math.random() * 2) + 3
      }
    });
  }, 5000); // Update every 5 seconds
};

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Home');
  const [phishingData, setPhishingData] = useState([]);
  const [takedownData, setTakedownData] = useState([]);
  const [recentThreats, setRecentThreats] = useState([]);
  const [metrics, setMetrics] = useState({
    totalDetected: 3200,
    last24h: 120,
    casesHandled: 120,
    escalationTime: 4
  });

  useEffect(() => {
    // Initialize with some data
    setPhishingData(Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 0, i + 1).toLocaleDateString(),
      value: Math.floor(Math.random() * 200) + 40
    })));

    setTakedownData([
      { domain: 'example1.com', status: 'In Progress', registrar: 'GoDaddy', submissionDate: '2025-01-01' },
      { domain: 'example2.net', status: 'Completed', registrar: 'Namecheap', submissionDate: '2025-01-05' }
    ]);

    // Set up real-time updates
    const wsConnection = simulateWebSocket((data) => {
      // Update phishing data
      setPhishingData(prev => [...prev.slice(1), data.phishingAttempt]);

      // Update takedown data
      setTakedownData(prev => [...prev.slice(-4), data.takedown]);

      // Update recent threats
      setRecentThreats(prev => [...prev.slice(-4), data.threat]);

      // Update metrics
      setMetrics(prev => ({
        totalDetected: prev.totalDetected + data.metrics.totalDetected,
        last24h: prev.last24h + data.metrics.last24h,
        casesHandled: prev.casesHandled + data.metrics.casesHandled,
        escalationTime: data.metrics.escalationTime
      }));
    });

    return () => clearInterval(wsConnection);
  }, []);

  const Metric = ({ label, value, isIncreasing = false }) => (
    <div className="bg-white/10 p-4 rounded-lg relative overflow-hidden">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-white flex items-center gap-2">
        {value}
        {isIncreasing && (
          <span className="text-green-400 text-sm animate-pulse">▲</span>
        )}
      </div>
      {isIncreasing && (
        <div className="absolute top-0 right-0 p-1 bg-green-500/20 text-green-400 text-xs rounded-bl">
          Live
        </div>
      )}
    </div>
  );

  const renderHome = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">NetSec: Unified Cybersecurity Platform</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 p-6 rounded-lg flex items-start gap-4">
          <Shield className="text-blue-400" size={24} />
          <div>
            <h3 className="text-lg font-semibold mb-2">Real-time Protection</h3>
            <p className="text-gray-400">Continuous monitoring and instant threat detection</p>
          </div>
        </div>
        <div className="bg-white/10 p-6 rounded-lg flex items-start gap-4">
          <AlertTriangle className="text-yellow-400" size={24} />
          <div>
            <h3 className="text-lg font-semibold mb-2">Threat Intelligence</h3>
            <p className="text-gray-400">Advanced analytics and trend analysis</p>
          </div>
        </div>
        <div className="bg-white/10 p-6 rounded-lg flex items-start gap-4">
          <Users className="text-green-400" size={24} />
          <div>
            <h3 className="text-lg font-semibold mb-2">Collaborative Defense</h3>
            <p className="text-gray-400">Unified response across organizations</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Objective</h3>
        <p className="text-gray-300 mb-6">
          To create a centralized platform for Public Sector Banks (PSBs) to efficiently detect and takedown phishing domains and fraudulent applications, ensuring customer safety.
        </p>
        
        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            Real-time detection and takedown requests
          </li>
          <li className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            Up-to-date phishing trends
          </li>
          <li className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            Centralized collaboration with CERT-In
          </li>
          <li className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            Automated threat response
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentThreats.slice(0, 3).map((threat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{threat.type}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  threat.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {threat.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Current Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Active Threats</span>
              <span className="text-white font-semibold">{metrics.last24h}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Total Detections</span>
              <span className="text-white font-semibold">{metrics.totalDetected.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhishingMetrics = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Phishing Detection Metrics</h1>
      <div className="grid grid-cols-2 gap-4">
        <Metric 
          label="Total Detected Domains" 
          value={metrics.totalDetected.toLocaleString()} 
          isIncreasing={true}
        />
        <Metric 
          label="Phishing Attempts (24h)" 
          value={metrics.last24h} 
          isIncreasing={true}
        />
      </div>
      <div className="bg-white/10 p-4 rounded-lg h-64 relative">
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <span className="animate-pulse">●</span>
          <span className="text-sm text-gray-400">Live Updates</span>
        </div>
        <ResponsiveContainer>
          <LineChart data={phishingData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#00C49F" 
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTakedownProgress = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Takedown Progress</h1>
      <div className="bg-white/10 p-4 rounded-lg relative">
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <span className="animate-pulse">●</span>
          <span className="text-sm text-gray-400">Live Updates</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-2">Domain</th>
              <th className="p-2">Status</th>
              <th className="p-2">Registrar</th>
              <th className="p-2">Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {takedownData.map((item, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-2">{item.domain}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-2">{item.registrar}</td>
                <td className="p-2">{item.submissionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-gray-800 p-4">
          <h2 className="text-xl font-bold mb-6">NetSec Dashboard</h2>
          <div className="space-y-2">
            {["Home", "Phishing Metrics", "Takedown Progress", "Collaboration", "Customer Awareness"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveMenu(item)}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeMenu === item ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeMenu === "Home" && renderHome()}
          {activeMenu === "Phishing Metrics" && renderPhishingMetrics()}
          {activeMenu === "Takedown Progress" && renderTakedownProgress()}
          {activeMenu === "Collaboration" && <div>Collaboration Content</div>}
          {activeMenu === "Customer Awareness" && <div>Customer Awareness Content</div>}
        </div>
      </div>
    </div>
  );
}
























































































