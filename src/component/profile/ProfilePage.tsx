'use client';
import React, { useState, useEffect } from 'react';
import { Answer, Badge, TabType } from '../../utils/contants/type';
import { ProfileHeader } from './ProfileHeader';
import { TabNavigation } from './TabNavigation';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileTab } from './profile tabs/ProfileTab';
import { QuestionsTab } from './profile tabs/QuestionTab';
import { AnswersTab } from './profile tabs/AnswerTab';
import { ActivityTab } from './profile tabs/ActivityTab';
import { SavedTab } from './profile tabs/SavedTab';
import { BadgesTab } from './profile tabs/BadgeTab';
import { useSearchParams } from 'next/navigation';
import AskQuestionForm from '../form/AskQuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '@/features/messageSlice';

// ============================================
// FILE: pages/ProfilePage.tsx
// ============================================
const ProfilePage: React.FC = ({ userId }) => {
  const param = useSearchParams();
  const dispatch = useDispatch();
  const tab = param?.get('tab');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [user, setUser] = useState();

  // State with URL parameter sync (lazy initializer to avoid calling setState in effect)
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/get-user/${userId}`,
        {
          method: 'GET',
        }
      );
      const data = await res.json();

      if (!data.ok) {
        dispatch(
          showMessage({
            message: data.message,
            messageType: 'error',
          })
        );
      }
      setUser(data.user);
    };

    fetchUser();
  }, []);

  // Listen for back/forward navigation and update tab (setState inside event callback is fine)
  useEffect(() => {
    const onPopState = () => {
      try {
        if (tab) {
          setActiveTab(tab as TabType);
        } else {
          setActiveTab('profile');
        }
      } catch {
        setActiveTab('profile');
      }
    };

    onPopState();
    return () => window.removeEventListener('popstate', onPopState);
  }, [tab]);

  // Update URL when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  const answers: Answer[] = [
    {
      id: 1,
      questionId: 101,
      questionTitle: 'How to handle CORS in Express.js?',
      content:
        'You can handle CORS in Express by using the cors middleware package. First install it: npm install cors. Then in your Express app: const cors = require("cors"); app.use(cors());. For more control, you can configure specific origins, methods, and headers.',
      votes: 156,
      isAccepted: true,
      createdAt: '5 hours ago',
    },
    {
      id: 2,
      questionId: 102,
      questionTitle: 'MongoDB query optimization for large datasets',
      content:
        'For large datasets, proper indexing is crucial. Create compound indexes for frequently queried fields. Use explain() to analyze query performance. Consider using aggregation pipelines for complex queries and limit() with skip() for pagination.',
      votes: 89,
      isAccepted: true,
      createdAt: '1 day ago',
    },
    {
      id: 3,
      questionId: 103,
      questionTitle: 'React useEffect cleanup function',
      content:
        'The cleanup function in useEffect is important for preventing memory leaks. It runs before the component unmounts and before re-running the effect. Return a function from useEffect that cancels subscriptions, clears timers, or aborts API calls.',
      votes: 64,
      isAccepted: false,
      createdAt: '2 days ago',
    },
  ];

  const badges: Badge[] = [
    {
      id: 1,
      name: 'Expert Contributor',
      description: 'Provided 100+ accepted answers',
      type: 'gold',
      earnedDate: '2 weeks ago',
      icon: '🏆',
    },
    {
      id: 2,
      name: 'Great Answer',
      description: 'Answer scored 100 or more',
      type: 'gold',
      earnedDate: '1 month ago',
      icon: '⭐',
    },
    {
      id: 3,
      name: 'Enthusiast',
      description: 'Visited the site each day for 30 consecutive days',
      type: 'silver',
      earnedDate: '2 months ago',
      icon: '🔥',
    },
    {
      id: 4,
      name: 'Nice Answer',
      description: 'Answer scored 10 or more',
      type: 'silver',
      earnedDate: '3 months ago',
      icon: '👍',
    },
    {
      id: 5,
      name: 'Scholar',
      description: 'Asked first question with score of 1 or more',
      type: 'bronze',
      earnedDate: '6 months ago',
      icon: '📚',
    },
    {
      id: 6,
      name: 'Student',
      description: 'First question with score of 1 or more',
      type: 'bronze',
      earnedDate: '6 months ago',
      icon: '🎓',
    },
  ];

  const isOwnProfile = true; // Change to false to see non-owner view

  if (!user) return;

  return (
    <div className='min-h-screen bg-slate-50'>
      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid lg:grid-cols-12 gap-6'>
          {/* Main Content */}
          <main className='lg:col-span-8'>
            {activeTab === 'profile' && <ProfileTab user={user} />}
            {activeTab === 'questions' && (
              <QuestionsTab question={user?.questions} />
            )}
            {activeTab === 'answers' && <AnswersTab answers={answers} />}
            {activeTab === 'badges' && <BadgesTab badges={badges} />}
            {activeTab === 'activity' && <ActivityTab />}
            {activeTab === 'saved' && <SavedTab />}
            {isAuthenticated && activeTab === 'ask' && <AskQuestionForm />}
          </main>

          {/* Sidebar */}
          <aside className='lg:col-span-4'>
            <ProfileSidebar user={user} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
