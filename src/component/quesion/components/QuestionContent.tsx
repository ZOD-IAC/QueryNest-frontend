'use client';

import { useState } from 'react';
import { VoteButtons } from './VoteButton';
import { Bookmark, Edit, Flag, Share2, Star } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface QuestionContentProps {
  question: QuestionData;
  onVote: (type: 'up' | 'down') => void;
  onBookmark: () => void;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  onVote,
  onBookmark,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='bg-white rounded-lg border border-slate-200 p-4 sm:p-6 max-w-full overflow-hidden'>
      <div className='flex flex-col md:flex-row gap-4 sm:gap-6'>
        {/* Vote Section */}
        <div className='flex md:flex-col items-center gap-4 md:gap-0'>
          <VoteButtons
            votes={question.upvotes.length}
            userVote={question.userVote?.length}
            onVote={onVote}
          />
          <button
            onClick={onBookmark}
            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center md:mt-4 transition-all ${
              question.isBookmarked
                ? 'bg-amber-100 border-amber-500 text-amber-600'
                : 'border-slate-300 text-slate-600 hover:bg-amber-50 hover:border-amber-400'
            }`}
          >
            <Bookmark
              className='w-5 h-5'
              fill={question.isBookmarked ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className='flex-1 min-w-0'>
          <div className='prose max-w-none mb-4'>
            <p className='text-slate-700 leading-relaxed whitespace-pre-wrap'>
              {question.body}
            </p>
          </div>

          {question.code && (
            <CodeBlock code={question.code} language={question.codeLanguage} />
          )}

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mb-6'>
            {question.tags.map((tag) => (
              <span
                key={tag}
                className='px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 text-blue-700 text-xs sm:text-sm rounded-md border border-blue-200 hover:bg-blue-100 cursor-pointer whitespace-nowrap'
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions and Author */}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between pt-4 border-t border-slate-200 gap-4'>
            <div className='flex gap-2'>
              <button className='flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Share2 className='w-4 h-4' />
                Share
              </button>
              <button className='flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Edit className='w-4 h-4' />
                Edit
              </button>
            </div>

            {/* Author Card */}
            {question.author && (
              <div className='bg-blue-50 rounded-lg p-3 border border-blue-100 w-full md:w-auto'>
                <div className='text-xs text-blue-600 mb-2'>
                  asked {question.createdAt}
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm'>
                    {question.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className='font-semibold text-slate-900 hover:text-blue-600 cursor-pointer text-sm'>
                      {question.author.name}
                    </div>
                    <div className='flex items-center gap-2 text-xs'>
                      <span className='text-slate-600'>
                        @{question.author.username}
                      </span>
                      <span className='text-slate-400'>•</span>
                      <div className='flex items-center gap-1 text-amber-600'>
                        <Star className='w-3 h-3' fill='currentColor' />
                        <span className='font-semibold'>
                          {question.author.reputation.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
