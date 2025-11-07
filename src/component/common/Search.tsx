'use client';
import { Clock, Filter, Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Search and Filter Bar Component
const SearchFilterBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className='bg-white border-b border-slate-200 sticky top-0 z-10'>
      <div className='p-4 space-y-3'>
        {/* Search Bar */}
        <div className='relative'>
          <Search className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search questions...'
            className='w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Sort and Filter Options */}
        <div className='flex items-center gap-3 flex-wrap'>
          <div className='flex items-center gap-2'>
            <label className='text-sm font-medium text-slate-700'>
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='newest'>Newest</option>
              <option value='active'>Active</option>
              <option value='unanswered'>Unanswered</option>
              <option value='votes'>Most Voted</option>
              <option value='views'>Most Viewed</option>
            </select>
          </div>

          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className='flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50'
          >
            <Filter className='w-4 h-4' />
            Filters
          </button>

          <div className='flex gap-2 ml-auto'>
            <button className='flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800'>
              <TrendingUp className='w-4 h-4' />
              Trending
            </button>
            <button className='flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800'>
              <Clock className='w-4 h-4' />
              Recent
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className='p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Tags
              </label>
              <div className='flex flex-wrap gap-2'>
                {['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python'].map(
                  (tag) => (
                    <button
                      key={tag}
                      className='px-3 py-1 bg-white border border-slate-300 rounded-full text-sm hover:bg-blue-50 hover:border-blue-500'
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
            <div>
              <label className='flex items-center gap-2 text-sm'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 rounded'
                />
                <span>Has accepted answer</span>
              </label>
              <label className='flex items-center gap-2 text-sm mt-2'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 rounded'
                />
                <span>No answers yet</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
