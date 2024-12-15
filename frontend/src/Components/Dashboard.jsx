import React, { useState } from 'react';
import { ChartBar, LoaderCircle } from 'lucide-react';

const Dashboard = () => {
  const [isIframeVisible, setIframeVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const redirectToKibana = () => {
    setLoading(true);
    setIframeVisible(true);
    // Set loading to false after a short delay to simulate loading
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 shadow-2xl rounded-2xl border-2 border-green-600 overflow-hidden">
        <div className="bg-gradient-to-r from-black via-green-900 to-green-800 p-6">
          <h1 className="text-3xl font-bold text-green-400 flex items-center">
            <ChartBar className="mr-3 w-8 h-8 text-green-500" />
            Dashboard
          </h1>
        </div>

        <div className="p-6">
          <button
            onClick={redirectToKibana}
            className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-green-500/50"
          >
            <ChartBar className="mr-2 text-green-200" />
            Open Kibana Dashboard
          </button>

          {isLoading && (
            <div className="flex items-center justify-center mt-6">
              <LoaderCircle className="animate-spin text-green-500 w-10 h-10" />
              <p className="ml-3 text-green-300">Loading Kibana Dashboard...</p>
            </div>
          )}

          {isIframeVisible && !isLoading && (
            <div className="mt-6 shadow-2xl rounded-xl overflow-hidden border-2 border-green-800">
              <iframe
                src="https://demo-54fd63.kb.us-central1.gcp.cloud.es.io/app/dashboards#/view/35ca9bac-1f97-402b-92d6-5795e808620f?_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-30d%2Fd,to:now))&_a=() "
                height="600"
                width="100%"
                title="Kibana Dashboard"
                className="border-none"
                frameBorder="0"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
