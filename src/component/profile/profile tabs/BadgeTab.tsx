// ============================================
// FILE: components/profile/BadgesTab.tsx
'use client';
import { Award, Calendar } from 'lucide-react';
import { Badge } from '../../../utils/contants/type';
import React, { useState } from 'react';
// ============================================
interface BadgesTabProps {
  badges: Badge[];
}

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const colors = {
    gold: 'from-amber-400 to-yellow-500',
    silver: 'from-slate-300 to-slate-400',
    bronze: 'from-orange-400 to-amber-500',
  };

  return (
    <div className='bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow'>
      <div className='flex items-start gap-4'>
        <div
          className={`w-16 h-16 bg-linear-to-br ${
            colors[badge.type]
          } rounded-full flex items-center justify-center text-white shadow-lg`}
        >
          <Award className='w-8 h-8' />
        </div>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-slate-900 mb-1'>
            {badge.name}
          </h3>
          <p className='text-sm text-slate-600 mb-2'>{badge.description}</p>
          <div className='flex items-center gap-2 text-xs text-slate-500'>
            <Calendar className='w-3 h-3' />
            <span>Earned {badge.earnedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BadgesTab: React.FC<BadgesTabProps> = ({ badges }) => {
  const [filter, setFilter] = useState<'all' | 'gold' | 'silver' | 'bronze'>(
    'all'
  );

  const filteredBadges = badges.filter((b) => {
    if (filter === 'all') return true;
    return b.type === filter;
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between bg-white rounded-lg border border-slate-200 p-4'>
        <h2 className='text-xl font-bold text-slate-900'>
          Badges ({badges.length})
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('gold')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === 'gold'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Gold
          </button>
          <button
            onClick={() => setFilter('silver')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === 'silver'
                ? 'bg-slate-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Silver
          </button>
          <button
            onClick={() => setFilter('bronze')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === 'bronze'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Bronze
          </button>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-4'>
        {filteredBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
};
