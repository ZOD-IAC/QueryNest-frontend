'use client';
import React, { useEffect, useState } from 'react';
import { Eye, Clock, Edit } from 'lucide-react';
import AnswerForm from '@/component/form/AnswerForm';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';
import { QuestionContent } from './components/QuestionContent';
import { AnswerCard } from './components/AnswerCard';
import { RelatedQuestions } from './components/RelatedQuestion';
import { BASE_URL } from '@/utils/Setting';
import CustomEditor from '../../component/editor/CustomEditor';
import { AnswerVoting } from '@/api/answer';

// ============================================
// FILE: types/question.types.ts
// ============================================

interface AnswerData {
  _id: number;
  content: string;
  code?: string;
  codeLanguage?: string;
  author: {
    id: number;
    name: string;
    username: string;
    reputation: number;
    avatar: string;
  };
  votes: number;
  isAccepted: boolean;
  createdAt: string;
  updatedAt?: string;
  userVote?: 'up' | 'down' | null;
}

// ============================================
// FILE: pages/QuestionDetailPage.tsx
// ============================================
const QuestionDetailPage: React.FC<any> = ({ data }) => {
  const dispatch = useDispatch();
  if (!data.ok) {
    dispatch(
      showMessage({
        message: data.message,
        messageType: 'error',
      }),
    );
    return;
  }

  const { question, tags } = data?.data;
  const { answers } = question
  console.log(answers ,'<--- answer');

  const handleQuestionVote = (type: 'up' | 'down') => {
    // setQuestion((prev) => ({
    //   ...prev,
    //   votes: type === 'up' ? prev.votes + 1 : prev.votes - 1,
    //   userVote: prev.userVote === type ? null : type,
    // }));
  };

  const handleAnswerVote = async (answerId: number, type: 'up' | 'down') => {
    try {
      const res = await AnswerVoting({ answerId, type });
      if (!res.ok) {
        throw new Error(res.message)
      }
      dispatch(showMessage({
        message: res.message,
        messageType: 'info'
      }))
    } catch (error: any) {
      const err = error?.message || "something went wrong!";
      dispatch(showMessage({
        message: err,
        messageType: 'error'
      }))

    }
  };

  const handleBookmark = () => {
    // setQuestion((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };

  const isQuestionAuthor = true;
  if (!question) return;
  return (
    <div className='min-h-screen bg-slate-50'>
      {/* questoin header */}
      <div className='bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-4'>
            {question.title}
          </h1>
          <div className='flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600'>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>Asked {question.createdAt}</span>
            </div>
            {question.updatedAt && (
              <div className='flex items-center gap-1'>
                <Edit className='w-4 h-4' />
                <span>Modified {question.updatedAt}</span>
              </div>
            )}
            <div className='flex items-center gap-1'>
              <Eye className='w-4 h-4' />
              <span>{question.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6'>
          {/* Main Content */}
          <main className='lg:col-span-9 space-y-4 sm:space-y-6'>
            <QuestionContent
              tags={tags}
              question={question}
              onVote={handleQuestionVote}
              onBookmark={handleBookmark}
            />

            {/* Answers Section */}
            <div className='bg-white rounded-lg border border-slate-200 p-4 sm:p-6'>
              <h2 className='text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6'>
                {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
              </h2>
              <div className='space-y-4 sm:space-y-6'>
                {answers.map((answer:AnswerData) => (
                  <AnswerCard
                    key={answer._id}
                    answer={answer}
                    onVote={(type) => handleAnswerVote(answer._id, type)}
                    // onAccept={() => handleAcceptAnswer(answer._id)}
                    isQuestionAuthor={isQuestionAuthor}
                  />
                ))}
              </div>
            </div>

            <AnswerForm questionId={question?._id} />
          </main>

          {/* Sidebar */}
          <aside className='lg:col-span-3 space-y-4 sm:space-y-6'>
            <RelatedQuestions />
          </aside>
        </div>
      </div>
    </div>
  );
};


export default QuestionDetailPage;
