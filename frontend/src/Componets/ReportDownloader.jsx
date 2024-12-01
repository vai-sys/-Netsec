import React, { useState } from 'react';
import { Download, FileText, Table } from 'lucide-react';

const ReportDownloader = () => {
  const [downloading, setDownloading] = useState(false);
  const [format, setFormat] = useState(null);

  const handleDownload = async (downloadFormat) => {
    setDownloading(true);
    setFormat(downloadFormat);

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await fetch(`http://localhost:5000/api/reports/download?format=${downloadFormat}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `incident_report.${downloadFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report');
    } finally {
      setDownloading(false);
      setFormat(null);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black border-2 border-green-500 rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-105 hover:shadow-green-500/50">
        <h2 className="text-3xl font-bold text-green-500 text-center mb-6">
          Incident Report Downloader
        </h2>

        <div className="space-y-4">
          {/* PDF Download Button */}
          <button 
            onClick={() => handleDownload('pdf')} 
            disabled={downloading}
            className={`w-full flex items-center justify-center space-x-4 p-4 rounded-lg 
              ${downloading && format === 'pdf' 
                ? 'bg-green-800 text-green-300 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
              } transition-all duration-300 transform`}
          >
            <FileText className="w-6 h-6" />
            <span>{downloading && format === 'pdf' ? 'Downloading PDF...' : 'Download PDF Report'}</span>
          </button>

          {/* CSV Download Button */}
          <button 
            onClick={() => handleDownload('csv')} 
            disabled={downloading}
            className={`w-full flex items-center justify-center space-x-4 p-4 rounded-lg 
              ${downloading && format === 'csv' 
                ? 'bg-green-800 text-green-300 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
              } transition-all duration-300 transform`}
          >
            <Table className="w-6 h-6" />
            <span>{downloading && format === 'csv' ? 'Downloading CSV...' : 'Download CSV Report'}</span>
          </button>
        </div>

        {/* Subtle Download Icon */}
        <div className="flex justify-center mt-6">
          <Download 
            className="w-12 h-12 text-green-500 opacity-50 animate-pulse" 
            strokeWidth={1.5} 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportDownloader;