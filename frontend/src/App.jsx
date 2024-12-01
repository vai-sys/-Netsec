import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  Home, 
  Shield, 
  MapPin, 
  List, 
  FileText, 
  PlusCircle, 
  LogOut, 
  User 
} from 'lucide-react';

// Import all components
import LoginPage from './Componets/Login';
import RegistrationPage from './Componets/Register.jsx';
import UserProfilePage from './Componets/UserProfile.jsx';
import IncidentDashboard from './Componets/IncidentDashboard.jsx';
import CreateIncidentPage from './Componets/CreateIncidentPage.jsx';
import IncidentMapView from './Componets/IncidentMapView.jsx';
import IncidentTimelineView from './Componets/IncidentTimeline.jsx';
import IncidentDetailsPage from './Componets/IncidentDetail.jsx';
import CreateReportPage from './Componets/CreateReport.jsx';
import ReportsListPage from './Componets/ReportListPage.jsx';
import ReportDownloadPage from './Componets/ReportDownloader.jsx';
import './index.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const Sidebar = () => {
    if (!isAuthenticated) return null;

    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-green-500 p-4 shadow-2xl border-r-2 border-green-800">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-wider">CYBER SHIELD</h2>
        </div>

        <nav className="space-y-2">
          <SidebarLink 
            to="/dashboard" 
            icon={<Home className="mr-3" />} 
            label="Dashboard" 
          />
          <SidebarLink 
            to="/incidents/create" 
            icon={<PlusCircle className="mr-3" />} 
            label="Create Incident" 
          />
          <SidebarLink 
            to="/incidents/map" 
            icon={<MapPin className="mr-3" />} 
            label="Incident Map" 
          />
          <SidebarLink 
            to="/incidents/timeline" 
            icon={<List className="mr-3" />} 
            label="Incident Timeline" 
          />
          <SidebarLink 
            to="/reports/create" 
            icon={<FileText className="mr-3" />} 
            label="Create Report" 
          />
          <SidebarLink 
            to="/reports-list" 
            icon={<List className="mr-3" />} 
            label="Reports List" 
          />
          <SidebarLink 
            to="/profile" 
            icon={<User className="mr-3" />} 
            label="Profile" 
          />
          
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center text-red-500 hover:bg-red-900 p-3 rounded-lg transition-colors"
          >
            <LogOut className="mr-3" /> Logout
          </button>
        </nav>
      </div>
    );
  };

  return (
    <Router>
      <div className="flex bg-black text-green-500 min-h-screen">
        <Sidebar />
        
        <div className={`flex-grow ${isAuthenticated ? 'ml-64' : ''} transition-all duration-300`}>
          <Routes>
            {/* Authentication Routes */}
            <Route 
              path="/login" 
              element={!isAuthenticated ? <LoginPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <RegistrationPage /> : <Navigate to="/dashboard" />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <IncidentDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              } 
            />

            {/* Incident Routes */}
            <Route 
              path="/incidents/create" 
              element={
                <PrivateRoute>
                  <CreateIncidentPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/incidents/map" 
              element={
                <PrivateRoute>
                  <IncidentMapView />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/incidents/timeline" 
              element={
                <PrivateRoute>
                  <IncidentTimelineView />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/incidents/:id" 
              element={
                <PrivateRoute>
                  <IncidentDetailsPage />
                </PrivateRoute>
              } 
            />

            {/* Report Routes */}
            <Route 
              path="/reports/create" 
              element={
                <PrivateRoute>
                  <CreateReportPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/reports-list" 
              element={
                <PrivateRoute>
                  <ReportsListPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/reports/download" 
              element={
                <PrivateRoute>
                  <ReportDownloadPage />
                </PrivateRoute>
              } 
            />

            {/* Redirect */}
            <Route 
              path="/" 
              element={
                isAuthenticated 
                  ? <Navigate to="/dashboard" /> 
                  : <Navigate to="/login" />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center w-full text-green-400 hover:bg-green-900 p-3 rounded-lg transition-colors"
  >
    {icon}
    {label}
  </Link>
);

export default App;