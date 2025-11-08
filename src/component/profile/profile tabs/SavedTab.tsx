// ============================================
// FILE: components/profile/SavedTab.tsx
import React from 'react';
import { Bookmark, X } from 'lucide-react';

// ============================================
export const SavedTab: React.FC = () => {
  const savedItems = [
    {
      id: 1,
      title: 'How to optimize React performance?',
      type: 'question',
      savedAt: '1 day ago',
    },
    {
      id: 2,
      title: 'Understanding async/await in JavaScript',
      type: 'question',
      savedAt: '3 days ago',
    },
    {
      id: 3,
      title: 'MongoDB indexing strategies',
      type: 'answer',
      savedAt: '5 days ago',
    },
  ];

  return (
    <div className='space-y-4'>
      <div className='bg-white rounded-lg border border-slate-200 p-4'>
        <h2 className='text-xl font-bold text-slate-900'>
          Saved Items ({savedItems.length})
        </h2>
      </div>

      {savedItems.map((item) => (
        <div
          key={item.id}
          className='bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow'
        >
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-start gap-3 flex-1'>
              <Bookmark className='w-5 h-5 text-blue-600 mt-1' />
              <div>
                <h3 className='text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer mb-1'>
                  {item.title}
                </h3>
                <div className='flex items-center gap-2 text-xs text-slate-500'>
                  <span className='capitalize'>{item.type}</span>
                  <span>•</span>
                  <span>Saved {item.savedAt}</span>
                </div>
              </div>
            </div>
            <button className='text-slate-400 hover:text-red-600'>
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
