import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReportDetail = () => {
  const { id } = useParams(); // Extract the report ID from the route parameters
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch token for authorization
      const response = await axios.get(`http://localhost:5000/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport(response.data);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to load report details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (loading) {
    return <div className="text-green-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!report) {
    return <div className="text-green-500">No report details available.</div>;
  }

  return (
    <div className="bg-black text-green-500 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Report Details</h1>
      <div className="p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-bold">Incident Type: {report.Incident_Type}</h2>
        <p>Location: {report.Location}</p>
        <p>Description: {report.Description}</p>
        <p>Threat Level: {report.Threat_Level}</p>
        <p>Status: {report.Status}</p>
        <p>Reporter: {report.Reporter?.name || 'N/A'}</p>
      </div>
    </div>
  );
};

export default ReportDetail;
