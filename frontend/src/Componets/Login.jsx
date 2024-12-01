// import React, { useState } from 'react';
// import { ShieldCheckIcon } from '@heroicons/react/24/solid';
// import axios from 'axios';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       localStorage.setItem('token', response.data.token);
      
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4">
//       <div className="bg-cyber-gray border border-cyber-green rounded-lg shadow-neon-green p-8 w-full max-w-md transform transition hover:scale-105">
//         <div className="flex justify-center mb-6">
//           <ShieldCheckIcon className="h-16 w-16 text-cyber-green animate-pulse" />
//         </div>
//         <h2 className="text-3xl font-bold text-cyber-green text-center mb-6">
//           Cyber Sentinel
//         </h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input 
//             type="email" 
//             placeholder="Email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green focus:outline-none focus:ring-2 focus:ring-cyber-light-green"
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green focus:outline-none focus:ring-2 focus:ring-cyber-light-green"
//           />
//           <button 
//             type="submit" 
//             className="w-full bg-cyber-green text-cyber-black py-3 rounded font-bold hover:bg-cyber-light-green transition duration-300 transform hover:scale-105 shadow-neon-green"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to Incident Dashboard after successful login
      navigate('/incident-dashboard'); // Adjust the path to match your routing setup
    } catch (error) {
      console.error('Login failed', error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4">
      <div className="bg-cyber-gray border border-cyber-green rounded-lg shadow-neon-green p-8 w-full max-w-md transform transition hover:scale-105">
        <div className="flex justify-center mb-6">
          <ShieldCheckIcon className="h-16 w-16 text-cyber-green animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-cyber-green text-center mb-6">
          Cyber Sentinel
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green focus:outline-none focus:ring-2 focus:ring-cyber-light-green"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-cyber-black border border-cyber-green rounded text-cyber-green focus:outline-none focus:ring-2 focus:ring-cyber-light-green"
          />
          <button 
            type="submit" 
            className="w-full bg-cyber-green text-cyber-black py-3 rounded font-bold hover:bg-cyber-light-green transition duration-300 transform hover:scale-105 shadow-neon-green"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
