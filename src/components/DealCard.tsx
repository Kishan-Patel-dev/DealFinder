import React from 'react';
import { ExternalLink, ShoppingCart, Timer, TrendingUp } from 'lucide-react';

interface DealProps {
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  platform: string;
  imageUrl: string;
  dealUrl: string;
  expiresIn?: string;
}

export default function DealCard({
  title,
  originalPrice,
  discountedPrice,
  discount,
  platform,
  imageUrl,
  dealUrl,
  expiresIn,
}: DealProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
          {discount}% OFF
        </div>
        <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
          {platform}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-green-600">${discountedPrice}</span>
          <span className="text-gray-500 line-through">${originalPrice}</span>
        </div>

        {expiresIn && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <Timer className="w-4 h-4" />
            <span>Ends in {expiresIn}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-orange-500">
            <TrendingUp className="w-4 h-4" />
            <span>Hot Deal</span>
          </div>
          <a
            href={dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Get Deal</span>
          </a>
        </div>
      </div>
    </div>
  );
}