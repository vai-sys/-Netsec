import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateReport = () => {
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    incidentType: '',
    severity: '',
    location: '',
    additionalNotes: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Report Submitted:', reportData);
    
   
    navigate('/reports');
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg">
      <div className="flex items-center mb-8">
        <FileText className="w-8 h-8 mr-4 text-green-500" />
        <h1 className="text-2xl font-bold">Create New Report</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Report Title
            </label>
            <input
              type="text"
              name="title"
              value={reportData.title}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Incident Type
            </label>
            <select
              name="incidentType"
              value={reportData.incidentType}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              required
            >
              <option value="">Select Incident Type</option>
              <option value="safety">Safety Incident</option>
              <option value="security">Security Breach</option>
              <option value="operational">Operational Issue</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={reportData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Severity
            </label>
            <select
              name="severity"
              value={reportData.severity}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              required
            >
              <option value="">Select Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={reportData.location}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional Notes
          </label>
          <textarea
            name="additionalNotes"
            value={reportData.additionalNotes}
            onChange={handleInputChange}
            rows="3"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 flex items-center"
          >
            <Save className="mr-2 w-5 h-5" />
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;