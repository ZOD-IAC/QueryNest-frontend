// ============================================
// FILE: components/profile/QuestionsTab.tsx
// ============================================
'use client';
import React, { useEffect, useState } from 'react';
import { Question } from '../../../utils/contants/type';
import { Clock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';
interface QuestionsTabProps {
  questions: Question[];
}

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className='bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow'>
      <div className='flex gap-4'>
        <div className='flex flex-col items-center gap-2 text-sm min-w-[70px]'>
          <div className='flex flex-col items-center'>
            <span className='font-semibold text-slate-700'>
              {question.upvotes}
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
            {question.body}
          </p>
          <div className='flex flex-wrap gap-2 mb-2'>
            {question.tags.map((tag) => (
              <span
                key={tag}
                className='px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md tracking-widest'
              >
                {tag}
              </span>
            ))}
          </div>
          <div className='flex items-center gap-2 text-xs text-slate-500'>
            <Clock className='w-3 h-3' />
            <span>asked {new Date(question.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuestionsTab: React.FC<QuestionsTabProps> = () => {
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>(
    'all'
  );

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'answered') return q.answersCount > 0;
    if (filter === 'unanswered') return q.answersCount === 0;
    return true;
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const auth = localStorage.getItem('auth');
        const { user, token } = JSON.parse(auth);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/question/user-questions/${user.id}`,
          {
            method: 'GET',
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!data.ok) {
          throw new Error(data?.message);
        }
        setQuestions(data.question);
        console.log(data, '<-- data fetched');
      } catch (error) {
        console.warn(error, 'something went wrong while fetching question');
        dispatch(
          showMessage({
            message: error,
            messageType: 'error',
          })
        );
      }
    };

    fetchQuestion();
  }, []);

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
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
};
