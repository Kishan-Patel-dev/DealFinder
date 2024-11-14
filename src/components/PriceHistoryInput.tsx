import React, { useState } from 'react';
import { LineChart, Link, Loader2 } from 'lucide-react';

export default function PriceHistoryInput() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    // Simulate loading for demo
    setTimeout(() => {
      window.open(`/price-history?url=${encodeURIComponent(url)}`, '_blank');
      setIsLoading(false);
      setUrl('');
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
      <div className="flex items-center gap-3 mb-4">
        <LineChart className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Price History Tracker</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Paste any product link from Amazon, Flipkart, or other supported stores to view its price history
        and make informed buying decisions.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste product URL here..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center min-w-[140px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading...
            </>
          ) : (
            <>
              <LineChart className="w-5 h-5 mr-2" />
              Track Price
            </>
          )}
        </button>
      </form>
    </div>
  );
}