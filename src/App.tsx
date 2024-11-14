import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import DealCard from './components/DealCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import SocialBanner from './components/SocialBanner';
import PriceHistoryInput from './components/PriceHistoryInput';
import ThemeSwitcher from './components/ThemeSwitcher';

// Sample deals data
const deals = [
  {
    id: 1,
    title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    originalPrice: 349.99,
    discountedPrice: 248.00,
    discount: 29,
    platform: "Amazon",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    dealUrl: "#",
    expiresIn: "2 days",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker",
    originalPrice: 129.99,
    discountedPrice: 89.99,
    discount: 31,
    platform: "Amazon",
    imageUrl: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80",
    dealUrl: "#",
    expiresIn: "5 hours",
    category: "Home & Kitchen"
  },
  {
    id: 3,
    title: "Nike Air Zoom Pegasus 38 Running Shoes",
    originalPrice: 120.00,
    discountedPrice: 89.99,
    discount: 25,
    platform: "Nike",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    dealUrl: "#",
    category: "Fashion"
  },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Deals');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Check if we're on the price history page
  const isPriceHistoryPage = window.location.pathname === '/price-history';
  
  if (isPriceHistoryPage) {
    const PriceHistory = React.lazy(() => import('./components/PriceHistory'));
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <PriceHistory />
      </React.Suspense>
    );
  }

  const filteredDeals = deals.filter((deal) => {
    const matchesCategory = selectedCategory === 'All Deals' || deal.category === selectedCategory;
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DealFinder</h1>
            </div>
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-6">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Top Deals</a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Categories</a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Stores</a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Blog</a>
              </nav>
              <ThemeSwitcher isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Social Banner */}
        <SocialBanner />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Price History Input */}
          <PriceHistoryInput />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Today's Best Deals
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the hottest deals and biggest savings from your favorite online stores,
              all in one place.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} {...deal} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">About DealFinder</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your one-stop destination for the best online shopping deals and discounts.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Categories</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Stores</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Popular Stores</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Amazon</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Flipkart</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Best Buy</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Walmart</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to get daily updates on the best deals!
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 DealFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;