// ============================================
// FILE: components/profile/QuestionsTab.tsx
// ============================================
'use client';
import React, { useState } from 'react';
import { Question } from '../contants/type';
import { Clock } from 'lucide-react';
interface QuestionsTabProps {
  questions: Question[];
}
// import QuestionCard from '../quesion/QuestionCard';

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className='bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow'>
      <div className='flex gap-4'>
        <div className='flex flex-col items-center gap-2 text-sm min-w-[70px]'>
          <div className='flex flex-col items-center'>
            <span className='font-semibold text-slate-700'>
              {question.votes}
            </span>
            <span className='text-slate-500 text-xs'>votes</span>
          </div>
          <div
            className={`flex flex-col items-center ${
              question.isAnswered ? 'text-green-600' : 'text-slate-500'
            }`}
          >
            <span
              className={`font-semibold ${
                question.isAnswered ? 'bg-green-100 px-2 py-1 rounded' : ''
              }`}
            >
              {question.answers}
            </span>
            <span className='text-xs mt-1'>answers</span>
          </div>
          <div className='flex flex-col items-center text-slate-500'>
            <span className='font-semibold'>{question.views}</span>
            <span className='text-xs'>views</span>
          </div>
        </div>

        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer mb-2'>
            {question.title}
          </h3>
          <p className='text-slate-600 text-sm mb-3 line-clamp-2'>
            {question.content}
          </p>
          <div className='flex flex-wrap gap-2 mb-2'>
            {question.tags.map((tag) => (
              <span
                key={tag}
                className='px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md'
              >
                {tag}
              </span>
            ))}
          </div>
          <div className='flex items-center gap-2 text-xs text-slate-500'>
            <Clock className='w-3 h-3' />
            <span>asked {question.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuestionsTab: React.FC<QuestionsTabProps> = ({ questions }) => {
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>(
    'all'
  );

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'answered') return q.isAnswered;
    if (filter === 'unanswered') return !q.isAnswered;
    return true;
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between bg-white rounded-lg border border-slate-200 p-4'>
        <h2 className='text-xl font-bold text-slate-900'>
          Questions ({questions.length})
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
            onClick={() => setFilter('answered')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === 'answered'
                ? 'bg-green-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Answered
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === 'unanswered'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Unanswered
          </button>
        </div>
      </div>

      {filteredQuestions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};
