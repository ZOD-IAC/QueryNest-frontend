'use client';
import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  Question,
  Answer,
  Badge,
  TabType,
} from '../../utils/contants/type';
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

// ============================================
// FILE: pages/ProfilePage.tsx
// ============================================
const ProfilePage: React.FC = () => {
  const param = useSearchParams();
  const tab = param?.get('tab');

  // State with URL parameter sync (lazy initializer to avoid calling setState in effect)
  const [activeTab, setActiveTab] = useState<TabType>('profile');

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

  // Mock data
  const user: UserProfile = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    bio: 'Full-stack developer passionate about React, TypeScript, and building scalable applications. Love helping others learn to code and sharing knowledge with the community.',
    location: 'San Francisco, CA',
    website: 'https://sarahdev.com',
    joinedDate: 'January 2020',
    avatar: '',
    reputation: 125840,
    stats: { questions: 234, answers: 1567, accepted: 892 },
  };

  const questions: Question[] = [
    {
      id: 1,
      title: 'How to implement authentication in React with TypeScript?',
      content:
        "I'm building a React application with TypeScript and need to implement user authentication. What's the best approach to handle JWT tokens and protect routes?",
      tags: ['React', 'TypeScript', 'Authentication'],
      votes: 42,
      answers: 5,
      views: 1203,
      createdAt: '2 hours ago',
      isAnswered: true,
    },
    {
      id: 2,
      title: 'Best practices for React state management in 2024',
      content:
        'With so many options available (Context API, Redux, Zustand, Jotai), what are the current best practices for managing state in large React applications?',
      tags: ['React', 'State Management', 'Best Practices'],
      votes: 28,
      answers: 0,
      views: 456,
      createdAt: '1 day ago',
      isAnswered: false,
    },
    {
      id: 3,
      title: 'TypeScript generic constraints with interfaces',
      content:
        "I'm trying to create a generic function that works with objects implementing a specific interface. How do I properly constrain the generic type?",
      tags: ['TypeScript', 'Generics', 'Interfaces'],
      votes: 15,
      answers: 3,
      views: 234,
      createdAt: '3 days ago',
      isAnswered: true,
    },
  ];

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
              <QuestionsTab questions={questions} />
            )}
            {activeTab === 'answers' && <AnswersTab answers={answers} />}
            {activeTab === 'badges' && <BadgesTab badges={badges} />}
            {activeTab === 'activity' && <ActivityTab />}
            {activeTab === 'saved' && <SavedTab />}
            {activeTab === 'ask' && <AskQuestionForm />}
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
