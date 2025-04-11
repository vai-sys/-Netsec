// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateReport = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     incidentType: '',
//     location: '',
//     threatLevel: '',
//     description: '',
//     additionalDetails: '',
//     reporter: '',
//     date: new Date().toISOString().split('T')[0]
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/reports', formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       toast.success('Report created successfully');
//       setTimeout(() => navigate('/reports'), 1500);
//     } catch (error) {
//       console.error('Error creating report:', error);
//       toast.error(error.response?.data?.message || 'Failed to create report');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-green-400 p-6">
//       <ToastContainer theme="dark" />
//       <div className="container mx-auto max-w-2xl">
//         <div className="bg-gray-900 border border-green-700 rounded-lg p-8">
//           <div className="flex justify-between items-center mb-6">
//             <button 
//               onClick={() => navigate('/reports')}
//               className="text-green-500 hover:text-green-300 flex items-center"
//             >
//               <ArrowLeft className="mr-2" /> Back to Reports
//             </button>
//             <h1 className="text-3xl font-bold text-green-300">Create Report</h1>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label className="text-green-500 block mb-2">Incident Type *</label>
//                 <select
//                   name="incidentType"
//                   value={formData.incidentType}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="" className="bg-black">Select Type</option>
//                   <option value="Security Breach" className="bg-black">Security Breach</option>
//                   <option value="Equipment Damage" className="bg-black">Equipment Damage</option>
//                   <option value="Network Intrusion" className="bg-black">Network Intrusion</option>
//                   <option value="Physical Access Violation" className="bg-black">Physical Access Violation</option>
//                   <option value="Data Loss" className="bg-black">Data Loss</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="text-green-500 block mb-2">Location *</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="e.g. Server Room, Main Office"
//                 />
//               </div>
              
//               <div>
//                 <label className="text-green-500 block mb-2">Threat Level *</label>
//                 <select
//                   name="threatLevel"
//                   value={formData.threatLevel}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="" className="bg-black">Select Level</option>
//                   <option value="High" className="bg-black">High</option>
//                   <option value="Medium" className="bg-black">Medium</option>
//                   <option value="Low" className="bg-black">Low</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="text-green-500 block mb-2">Reporter Name *</label>
//                 <input
//                   type="text"
//                   name="reporter"
//                   value={formData.reporter}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Your Name"
//                 />
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="text-green-500 block mb-2">Date *</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="text-green-500 block mb-2">Description *</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 rows="4"
//                 className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="Provide details about the incident"
//               ></textarea>
//             </div>

//             <div className="mb-6">
//               <label className="text-green-500 block mb-2">Additional Details</label>
//               <textarea
//                 name="additionalDetails"
//                 value={formData.additionalDetails}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="Any additional information or observations"
//               ></textarea>
//             </div>

//             <div className="flex items-center justify-between mt-8">
//               <div className="flex items-center text-yellow-500">
//                 <AlertTriangle className="mr-2" />
//                 <span>Fields marked with * are required</span>
//               </div>
//               <button 
//                 type="submit"
//                 disabled={loading}
//                 className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 transition flex items-center disabled:opacity-50"
//               >
//                 <Save className="mr-2" />
//                 {loading ? 'Submitting...' : 'Submit Report'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateReport;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    incidentType: '',
    location: '',
    severity: '', // Renamed from threatLevel to match backend
    description: '',
    additionalNotes: '', // Renamed from additionalDetails to match backend
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/reports', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Report created successfully');
      setTimeout(() => navigate('/reports'), 1500);
    } catch (error) {
      console.error('Error creating report:', error);
      toast.error(error.response?.data?.message || 'Failed to create report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      <ToastContainer theme="dark" />
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gray-900 border border-green-700 rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate('/reports')}
              className="text-green-500 hover:text-green-300 flex items-center"
            >
              <ArrowLeft className="mr-2" /> Back to Reports
            </button>
            <h1 className="text-3xl font-bold text-green-300">Create Report</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Added title field */}
              <div className="md:col-span-2">
                <label className="text-green-500 block mb-2">Report Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter a descriptive title"
                />
              </div>
              
              <div>
                <label className="text-green-500 block mb-2">Incident Type *</label>
                <select
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" className="bg-black">Select Type</option>
                  <option value="Security Breach" className="bg-black">Security Breach</option>
                  <option value="Equipment Damage" className="bg-black">Equipment Damage</option>
                  <option value="Network Intrusion" className="bg-black">Network Intrusion</option>
                  <option value="Physical Access Violation" className="bg-black">Physical Access Violation</option>
                  <option value="Data Loss" className="bg-black">Data Loss</option>
                </select>
              </div>
              
              <div>
                <label className="text-green-500 block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Server Room, Main Office"
                />
              </div>
              
              <div>
                <label className="text-green-500 block mb-2">Severity *</label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" className="bg-black">Select Level</option>
                  <option value="High" className="bg-black">High</option>
                  <option value="Medium" className="bg-black">Medium</option>
                  <option value="Low" className="bg-black">Low</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="text-green-500 block mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-green-500 block mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Provide details about the incident"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="text-green-500 block mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 bg-gray-900 text-green-300 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Any additional information or observations"
              ></textarea>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center text-yellow-500">
                <AlertTriangle className="mr-2" />
                <span>Fields marked with * are required</span>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 transition flex items-center disabled:opacity-50"
              >
                <Save className="mr-2" />
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;