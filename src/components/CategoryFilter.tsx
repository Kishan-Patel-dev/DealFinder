import React from 'react';
import { Tag } from 'lucide-react';

const categories = [
  'All Deals',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Toys',
  'Beauty',
  'Sports',
];

interface Props {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: Props) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-6">
      <Tag className="w-5 h-5 text-blue-600" />
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}