// ============================================
// FILE: components/question/RelatedQuestions.tsx
// ============================================

import { MessageSquare, ThumbsUp } from 'lucide-react';

export const RelatedQuestions: React.FC = () => {
  const related = [
    {
      id: 1,
      title: 'How to optimize React performance?',
      votes: 42,
      answers: 5,
    },
    {
      id: 2,
      title: 'Understanding async/await in JavaScript',
      votes: 38,
      answers: 8,
    },
    {
      id: 3,
      title: 'MongoDB vs PostgreSQL for web apps',
      votes: 29,
      answers: 6,
    },
    { id: 4, title: 'Best practices for API design', votes: 51, answers: 12 },
  ];

  return (
    <div className='bg-white rounded-lg border border-slate-200 p-4'>
      <h3 className='font-semibold text-slate-900 mb-4'>Related Questions</h3>
      <div className='space-y-3'>
        {related.map((q) => (
          <div key={q.id} className='group'>
            <div className='flex gap-3'>
              <div className='flex gap-2 text-xs text-slate-600'>
                <span className='flex items-center gap-1'>
                  <ThumbsUp className='w-3 h-3' />
                  {q.votes}
                </span>
                <span className='flex items-center gap-1'>
                  <MessageSquare className='w-3 h-3' />
                  {q.answers}
                </span>
              </div>
              <div className='flex-1'>
                <div className='text-sm text-blue-600 hover:text-blue-700 cursor-pointer group-hover:underline'>
                  {q.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
