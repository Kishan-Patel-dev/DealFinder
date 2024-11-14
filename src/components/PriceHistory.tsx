import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Calendar, DollarSign, LineChart, ShoppingCart, Image as ImageIcon } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for price history
const mockProduct = {
  title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  currentPrice: 299.99,
  originalPrice: 399.99,
  discount: 25,
  highest: 399.99,
  lowest: 249.99,
  average: 324.99,
  priceHistory: [
    { date: '2023-10', price: 399.99 },
    { date: '2023-11', price: 379.99 },
    { date: '2023-12', price: 349.99 },
    { date: '2024-01', price: 299.99 },
    { date: '2024-02', price: 279.99 },
    { date: '2024-03', price: 299.99 },
  ]
};

type TimeFilter = 'all' | '6m' | '3m' | '1m';

export default function PriceHistory() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const searchParams = new URLSearchParams(window.location.search);
  const productUrl = searchParams.get('url');

  const filterPriceHistory = (filter: TimeFilter) => {
    const now = new Date();
    const history = [...mockProduct.priceHistory];
    
    switch (filter) {
      case '6m':
        return history.filter(item => {
          const date = new Date(item.date);
          return (now.getTime() - date.getTime()) <= 180 * 24 * 60 * 60 * 1000;
        });
      case '3m':
        return history.filter(item => {
          const date = new Date(item.date);
          return (now.getTime() - date.getTime()) <= 90 * 24 * 60 * 60 * 1000;
        });
      case '1m':
        return history.filter(item => {
          const date = new Date(item.date);
          return (now.getTime() - date.getTime()) <= 30 * 24 * 60 * 60 * 1000;
        });
      default:
        return history;
    }
  };

  const chartData = {
    labels: filterPriceHistory(timeFilter).map(item => item.date),
    datasets: [
      {
        label: 'Price History',
        data: filterPriceHistory(timeFilter).map(item => item.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: number) => `$${value}`,
        },
      },
    },
  };

  const getBuyAdvice = () => {
    const currentPrice = mockProduct.currentPrice;
    const lowestPrice = mockProduct.lowest;
    const highestPrice = mockProduct.highest;
    const averagePrice = mockProduct.average;

    if (currentPrice <= lowestPrice * 1.05) return 'yes';
    if (currentPrice >= highestPrice * 0.95) return 'skip';
    if (currentPrice > averagePrice) return 'wait';
    return 'okay';
  };

  const buyAdvice = getBuyAdvice();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {/* Product Details */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={mockProduct.image}
                  alt={mockProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4 dark:text-white">{mockProduct.title}</h1>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-blue-600">${mockProduct.currentPrice}</span>
                <span className="text-xl text-gray-500 line-through">${mockProduct.originalPrice}</span>
                <span className="text-green-500 font-semibold">-{mockProduct.discount}%</span>
              </div>
              <a
                href={productUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all dark:text-blue-400"
              >
                {productUrl || 'No URL provided'}
              </a>
            </div>
          </div>

          {/* Price Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <PriceCard
              title="Highest Price"
              value={mockProduct.highest}
              icon={<ArrowUp className="w-5 h-5" />}
              color="red"
            />
            <PriceCard
              title="Lowest Price"
              value={mockProduct.lowest}
              icon={<ArrowDown className="w-5 h-5" />}
              color="green"
            />
            <PriceCard
              title="Average Price"
              value={mockProduct.average}
              icon={<Calendar className="w-5 h-5" />}
              color="purple"
            />
          </div>

          {/* Price Timeline */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold dark:text-white">Price Timeline</h2>
              <div className="flex gap-2">
                {(['all', '6m', '3m', '1m'] as TimeFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      timeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter.toUpperCase()}
                  </button>
                ))}
                <button
                  onClick={() => setTimeFilter('all')}
                  className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-[400px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Buy Advice */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Should you buy at this price?</h2>
            <div className="relative h-2 bg-gray-200 rounded-full mb-4">
              <div
                className={`absolute top-0 left-0 h-full rounded-full ${
                  buyAdvice === 'skip' ? 'w-1/4 bg-red-500' :
                  buyAdvice === 'wait' ? 'w-2/4 bg-yellow-500' :
                  buyAdvice === 'okay' ? 'w-3/4 bg-blue-500' :
                  'w-full bg-green-500'
                }`}
              />
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
              <span>Skip</span>
              <span>Wait</span>
              <span>Okay</span>
              <span>Yes</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <a
              href={productUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              View Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PriceCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'red' | 'green' | 'purple';
}

function PriceCard({ title, value, icon, color }: PriceCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/50 dark:text-red-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
      </div>
      <p className="text-2xl font-bold dark:text-white">${value.toFixed(2)}</p>
    </div>
  );
}