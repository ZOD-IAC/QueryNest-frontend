'use client';
import React, { useState } from 'react';
import SearchFilterBar from '../common/Search';
import QuestionList from './QuestionList';
import InfoSidebar from './InfoSidebar';
import LoginPromptBanner from '../common/LoginPromptBanner';
import AskQuestionForm from '../form/AskQuestionForm';
import { getDataFromlocal } from '@/utils/helper';
import UserQuestionCard from './components/UserQuestionCard';

// Main Questions Page Component
const QuestionsPage: React.FC = () => {
  const { user, isAuth } = getDataFromlocal();
  const [showAskForm, setShowAskForm] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Left Sidebar - User Questions */}
          <UserQuestionCard isAuthenticated={isAuth} user={user} />

          {/* Main Content - Questions List */}
          <main className='lg:col-span-6'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold text-slate-800 mb-2'>
                All Questions
              </h2>
              <p className='text-slate-600'>24,567 questions</p>
            </div>

            {showAskForm && isAuth ? (
              <div className='mb-6'>
                <AskQuestionForm onClose={() => setShowAskForm(false)} />
              </div>
            ) : showAskForm && !isAuth ? (
              <div className='mb-6'>
                <LoginPromptBanner />
              </div>
            ) : null}

            <SearchFilterBar />
            <div className='mt-4'>
              <QuestionList />
            </div>

            {/* Pagination */}
            <div className='mt-6 flex justify-center gap-2'>
              <button className='px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50'>
                Previous
              </button>
              <button className='px-3 py-2 bg-blue-600 text-white rounded-lg text-sm'>
                1
              </button>
              <button className='px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50'>
                2
              </button>
              <button className='px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50'>
                3
              </button>
              <button className='px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50'>
                Next
              </button>
            </div>
          </main>

          {/* Right Sidebar - Stats and Info */}
          <aside className='lg:col-span-3'>
            <InfoSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
