import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function SocialBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Join Our Deal Alert Community!</h2>
            <p className="text-blue-100">Get instant notifications for the hottest deals and exclusive offers.</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a
              href="#telegram-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Send className="w-5 h-5" />
              Join Telegram
            </a>
            <a
              href="#whatsapp-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Join WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}