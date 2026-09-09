import React, { useState, useEffect } from 'react';
import { WebsiteConfig } from '../../types/project';
import { getWhatsAppLink } from '../../lib/themes/themeUtils';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC<{ config: WebsiteConfig }> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wa = config?.whatsapp;

  if (!wa || !wa.enabled || !wa.floatingButton) return null;

  const positionClass = wa.floatingPosition === 'bottom-left' ? 'left-5' : 'right-5';
  const waLink = getWhatsAppLink(config);

  return (
    <div className={`fixed bottom-6 ${positionClass} z-50 flex flex-col items-end`}>
      {isOpen && (
        <div className="mb-3 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900 dark:text-white">{config.business.name}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">● Online sekarang</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="py-3 text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl mt-2">
            Halo! Ada yang bisa kami bantu? Silakan klik tombol di bawah untuk langsung terhubung ke WhatsApp kami.
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow hover:opacity-95 transition-all"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="w-4 h-4" />
            Mulai Chat WhatsApp
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-xs"
        style={{ backgroundColor: '#25D366' }}
        title="Chat WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">{wa.buttonText || 'Chat WhatsApp'}</span>
      </button>
    </div>
  );
};
