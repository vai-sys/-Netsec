import React, { useEffect, useState } from 'react';

const ReportsListPage = () => {
  const [reports, setReports] = useState([]); // Default reports as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true); // Set loading state to true when fetching starts
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await fetch('http://localhost:5000/api/reports', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        // Check if the response is successful
        if (!response.ok) {
          const errorData = await response.json(); // Attempt to read error response
          throw new Error(`Failed to fetch reports: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        
        // Check if the data is an array before setting state
        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError(err.message || 'Failed to load reports');
      } finally {
        setLoading(false); // Data fetching finished
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {reports.length > 0 ? (
        reports.map((report) => (
          <div key={report._id}> {/* Using _id here assuming MongoDB */}
            <h3>{report.title}</h3>
            <p>{report.description}</p>
          </div>
        ))
      ) : (
        <div>No reports found.</div>
      )}
    </div>
  );
};

export default ReportsListPage;