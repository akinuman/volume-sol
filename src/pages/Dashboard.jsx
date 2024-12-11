import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { configService } from '../config/config.service';

function ConfigSection({ title, data }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <dt className="text-sm font-medium text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 break-all">
                {typeof value === 'boolean' 
                  ? value.toString() 
                  : typeof value === 'object' 
                    ? JSON.stringify(value, null, 2)
                    : value || 'Not set'}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [config, setConfig] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    setConfig(configService.getConfig());
  }, []);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your PF Volume Bot configuration and quick actions.
          </p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/buy"
                className="inline-flex w-full justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Buy Modes
              </Link>
              <Link
                to="/sell"
                className="inline-flex w-full justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sell Modes
              </Link>
            </div>
          </div>
        </div>

        {/* Configuration Overview Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Configuration</h3>
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {showConfig ? 'Hide Config' : 'Show Config'}
              </button>
            </div>
            {showConfig && config && (
              <div className="space-y-6">
                <ConfigSection title="Network Settings" data={config.network} />
                <ConfigSection title="Trading Settings" data={config.trading} />
                <ConfigSection title="Compute Settings" data={config.compute} />
                <ConfigSection title="JITO Settings" data={config.jito} />
                <ConfigSection title="Wallet Settings" data={config.wallets} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}