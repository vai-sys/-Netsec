import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/reports', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, status, page },
      });
      setReports(response.data.reports || []); // Assuming `reports` key in the response
      setTotalPages(response.data.totalPages || 1); // Assuming `totalPages` key in the response
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access. Redirecting to login...');
        // Handle redirect to login
      } else {
        console.error('Error fetching reports:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchReports();
  }, [search, status, page]);

  const downloadReport = async (format) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/reports/export', {
        headers: { Authorization: `Bearer ${token}` },
        params: { format },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reports.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading reports:', error.message);
    }
  };

  return (
    <div className="bg-black text-green-500 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Reports</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded bg-gray-800 text-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded bg-gray-800 text-green-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          className="p-2 bg-green-500 text-black rounded"
          onClick={() => downloadReport('csv')}
        >
          Download CSV
        </button>
        <button
          className="p-2 bg-green-500 text-black rounded"
          onClick={() => downloadReport('pdf')}
        >
          Download PDF
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div key={report._id} className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-bold">{report.Incident_Type}</h2>
            <p className="text-sm">Location: {report.Location}</p>
            <p className="text-sm">Status: {report.Status}</p>
            <Link
              to={`/reports/${report._id}`}
              className="text-green-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="p-2 bg-green-500 text-black rounded mx-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-green-500 mx-2">{`Page ${page} of ${totalPages}`}</span>
        <button
          className="p-2 bg-green-500 text-black rounded mx-2"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportList;
