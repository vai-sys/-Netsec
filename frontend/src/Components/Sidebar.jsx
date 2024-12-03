


// import React from 'react';
// import { Home, User, AlertTriangle, FileText, Map, Clock, BarChart2 } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {

//   const menuItems = [
//     { icon: <Home className="w-6 h-6" />, text: 'Dashboard', path: '/dashboard' },
//     { icon: <User className="w-6 h-6" />, text: 'Profile', path: '/profile' },
//     { icon: <AlertTriangle className="w-6 h-6" />, text: 'Incidents', path: '/incidents' },
//     { icon: <FileText className="w-6 h-6" />, text: 'Reports', path: '/reports' },
//     { icon: <Map className="w-6 h-6" />, text: 'Map View', path: '/map' },
//     { icon: <Clock className="w-6 h-6" />, text: 'Timeline', path: '/timeline' },
//     { icon: <BarChart2 className="w-6 h-6" />, text: 'Sector Analysis', path: '/sector' }
//   ];

//   return (
//     <div className="sidebar fixed top-0 left-0 h-full bg-black text-white p-6 w-64 shadow-xl">
//       <div className="logo text-center mb-12">
//         <h1 className="text-green-500 text-2xl font-bold tracking-wider">APP NAME</h1>
//       </div>

//       <nav className="mt-12 space-y-4">
//         {menuItems.map((item, index) => (
//           <Link key={index} to={item.path} className="flex items-center p-4 hover:bg-green-900 rounded-lg transition-colors duration-300">
//             {item.icon}
//             <span className="ml-4 text-sm font-medium">{item.text}</span>
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Home, User, AlertTriangle, FileText, Map, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home className="w-6 h-6" />, text: 'Dashboard', path: '/dashboard' },
    { icon: <User className="w-6 h-6" />, text: 'Profile', path: '/profile' },
    { icon: <AlertTriangle className="w-6 h-6" />, text: 'Incidents', path: '/incidents' },
    { icon: <FileText className="w-6 h-6" />, text: 'Reports', path: '/reports' },
    { icon: <Map className="w-6 h-6" />, text: 'Map View', path: '/map' },
    { icon: <Clock className="w-6 h-6" />, text: 'Timeline', path: '/timeline' },
    { icon: <BarChart2 className="w-6 h-6" />, text: 'Sector Analysis', path: '/sector' }
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-black text-white shadow-xl">
      <div className="logo text-center mb-12">
        <h1 className="text-green-500 text-2xl font-bold tracking-wider">APP NAME</h1>
      </div>

      <nav className="mt-12 space-y-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center p-4 hover:bg-green-900 rounded-lg transition-colors duration-300"
          >
            {item.icon}
            <span className="ml-4 text-sm font-medium">{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;