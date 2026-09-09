import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';

export const TeamSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Tim Ahli & Profesional Kami';
  const subtitle = content.subtitle || 'Berdedikasi memberikan hasil terbaik untuk Anda.';
  const members = content.members || [];

  return (
    <section id="team" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member: any, idx: number) => (
          <div
            key={idx}
            className={`bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm overflow-hidden text-center p-6 ${cardRadius}`}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-gray-100 dark:border-gray-700"
              />
            ) : (
              <div
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center font-bold text-2xl text-white mb-4"
                style={{ backgroundColor: config.branding.primaryColor }}
              >
                {member.name ? member.name.charAt(0) : 'T'}
              </div>
            )}
            <h3 className="font-bold text-base text-gray-900 dark:text-white">{member.name}</h3>
            <p className="text-xs font-semibold mt-1" style={{ color: config.branding.primaryColor }}>
              {member.role}
            </p>
            {member.bio && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{member.bio}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
