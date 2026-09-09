import React, { useState, useEffect } from 'react';
import { WebsiteConfig } from '../../types/project';
import { ArrowUp } from 'lucide-react';

export const GoToTop: React.FC<{ config: WebsiteConfig }> = ({ config }) => {
  const [visible, setVisible] = useState(false);
  const gtt = config?.goToTop;

  useEffect(() => {
    if (gtt?.enabled === false) {
      setVisible(false);
      return;
    }

    const threshold = gtt?.showAfterScroll || 200;

    const checkScroll = () => {
      const windowScrolled = window.scrollY || document.documentElement.scrollTop;
      // Also check if preview container in builder is scrolling
      const canvasScroll = document.querySelector('main')?.scrollTop || 0;
      if (windowScrolled > threshold || canvasScroll > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.addEventListener('scroll', checkScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', checkScroll);
      if (mainEl) {
        mainEl.removeEventListener('scroll', checkScroll);
      }
    };
  }, [gtt?.enabled, gtt?.showAfterScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (gtt?.enabled === false || !visible) return null;

  const positionClass =
    gtt?.position === 'bottom-right'
      ? 'bottom-6 right-20' // offset so it doesn't overlap with WhatsApp button
      : 'bottom-6 left-6';

  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${positionClass} z-40 p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 shadow-xl hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 cursor-pointer animate-fade-in group`}
      title="Kembali ke Atas Halaman"
      aria-label="Kembali ke atas"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
