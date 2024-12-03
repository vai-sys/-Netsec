


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './Components/Sidebar';
// import AuthPage from './Components/AuthPage';
// import Dashboard from './Components/Dashboard';
// import Profile from './Components/Profile';
// import Incidents from './Components/Incidents';
// import Reports from './Components/Reports';
// import MapView from './Components/MapView';
// import Timeline from './Components/Timeline';
// import SectorAnalysis from './Components/Sector';
// import IncidentDetails from './Components/IncidentDetail';
// import './index.css';

// // PrivateRoute component for protecting routes
// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-grow ml-64 p-8">{children}</main> {/* Adjusted content margin to accommodate sidebar */}
//     </div>
//   ) : (
//     <Navigate to="/auth" />
//   );
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/auth" element={<AuthPage />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/incidents"
//           element={
//             <PrivateRoute>
//               <Incidents />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/incidents/:id"
//           element={
//             <PrivateRoute>
//               <IncidentDetails />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/reports"
//           element={
//             <PrivateRoute>
//               <Reports />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/map"
//           element={
//             <PrivateRoute>
//               <MapView />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/timeline"
//           element={
//             <PrivateRoute>
//               <Timeline />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/sector"
//           element={
//             <PrivateRoute>
//               <SectorAnalysis />
//             </PrivateRoute>
//           }
//         />

//         {/* Redirect to dashboard if token exists, otherwise to auth */}
//         <Route
//           path="/"
//           element={
//             localStorage.getItem('token') ? (
//               <Navigate to="/dashboard" />
//             ) : (
//               <Navigate to="/auth" />
//             )
//           }
//         />

//         {/* Fallback route */}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import AuthPage from './Components/AuthPage';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Incidents from './Components/Incidents';
import Reports from './Components/Reports';
import MapView from './Components/MapView';
import Timeline from './Components/Timeline';
import SectorAnalysis from './Components/Sector';
import IncidentDetails from './Components/IncidentDetail';
import ReportsDetail from './Components/ReportDetail'
import './index.css';

// PrivateRoute component for protecting routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 bg-black">{children}</main> {/* Adjust content margin to accommodate sidebar */}
    </div>
  ) : (
    <Navigate to="/auth" />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/incidents"
          element={
            <PrivateRoute>
              <Incidents />
            </PrivateRoute>
          }
        />
        <Route
          path="/incidents/:id"
          element={
            <PrivateRoute>
              <IncidentDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/:id"
          element={
            <PrivateRoute>
              <ReportsDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <MapView />
            </PrivateRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <PrivateRoute>
              <Timeline />
            </PrivateRoute>
          }
        />
        <Route
          path="/sector"
          element={
            <PrivateRoute>
              <SectorAnalysis />
            </PrivateRoute>
          }
        />

        {/* Redirect to dashboard if token exists, otherwise to auth */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
