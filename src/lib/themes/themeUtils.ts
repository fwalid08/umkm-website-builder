import React from 'react';
import { WebsiteConfig } from '../../types/project';

export function getRadiusClass(radius?: string): string {
  switch (radius) {
    case 'none':
      return 'rounded-none';
    case 'sm':
      return 'rounded-sm';
    case 'md':
      return 'rounded-lg';
    case 'lg':
      return 'rounded-2xl';
    case 'full':
      return 'rounded-full';
    default:
      return 'rounded-xl';
  }
}

export function getCardRadiusClass(radius?: string): string {
  switch (radius) {
    case 'none':
      return 'rounded-none';
    case 'sm':
      return 'rounded-md';
    case 'md':
      return 'rounded-xl';
    case 'lg':
      return 'rounded-2xl';
    case 'full':
      return 'rounded-3xl';
    default:
      return 'rounded-xl';
  }
}

export function getButtonStyle(
  config: WebsiteConfig,
  variant: 'primary' | 'secondary' | 'outline' = 'primary'
): { className: string; style: React.CSSProperties } {
  const radius = getRadiusClass(config.branding.borderRadius);
  const primary = config.branding.primaryColor || '#2563eb';
  const secondary = config.branding.secondaryColor || '#1e293b';

  if (variant === 'outline') {
    return {
      className: `inline-flex items-center justify-center font-medium transition-all duration-200 px-5 py-2.5 text-sm border ${radius} hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2`,
      style: {
        borderColor: primary,
        color: primary,
        backgroundColor: 'transparent',
      },
    };
  }

  if (variant === 'secondary') {
    return {
      className: `inline-flex items-center justify-center font-medium transition-all duration-200 px-5 py-2.5 text-sm text-white ${radius} hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2`,
      style: {
        backgroundColor: secondary,
      },
    };
  }

  // Primary
  const btnType = config.branding.buttonStyle || 'solid';
  let extraClass = '';
  if (btnType === 'shadow') extraClass = 'shadow-lg shadow-blue-500/20';
  if (btnType === 'soft') {
    return {
      className: `inline-flex items-center justify-center font-medium transition-all duration-200 px-5 py-2.5 text-sm ${radius} hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2`,
      style: {
        backgroundColor: `${primary}18`,
        color: primary,
      },
    };
  }

  return {
    className: `inline-flex items-center justify-center font-medium transition-all duration-200 px-5 py-2.5 text-sm text-white ${radius} ${extraClass} hover:opacity-95 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2`,
    style: {
      backgroundColor: primary,
    },
  };
}

export function getWhatsAppLink(config: WebsiteConfig, customText?: string): string {
  const rawNumber = config.whatsapp.number || config.business.phone || '';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(customText || config.whatsapp.defaultMessage || 'Halo, saya ingin bertanya.');
  return `https://wa.me/${cleanNumber}?text=${message}`;
}
