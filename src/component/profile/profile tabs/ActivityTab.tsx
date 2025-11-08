// ============================================
// FILE: components/profile/ActivityTab.tsx
import React from 'react';
import { Award, CheckCircle, MessageSquare, ThumbsUp } from 'lucide-react';

// ============================================
export const ActivityTab: React.FC = () => {
  const activities = [
    {
      type: 'answer',
      text: 'Answered "How to implement JWT in Node.js?"',
      time: '2 hours ago',
      icon: <CheckCircle className='w-5 h-5 text-green-600' />,
    },
    {
      type: 'question',
      text: 'Asked "Best practices for React state management"',
      time: '5 hours ago',
      icon: <MessageSquare className='w-5 h-5 text-blue-600' />,
    },
    {
      type: 'vote',
      text: 'Upvoted 3 questions',
      time: '1 day ago',
      icon: <ThumbsUp className='w-5 h-5 text-purple-600' />,
    },
    {
      type: 'badge',
      text: 'Earned Gold badge "Expert Contributor"',
      time: '2 days ago',
      icon: <Award className='w-5 h-5 text-amber-600' />,
    },
    {
      type: 'answer',
      text: 'Answer accepted for "MongoDB aggregation pipeline"',
      time: '3 days ago',
      icon: <CheckCircle className='w-5 h-5 text-green-600' />,
    },
  ];

  return (
    <div className='bg-white rounded-lg border border-slate-200'>
      <div className='p-4 border-b border-slate-200'>
        <h2 className='text-xl font-bold text-slate-900'>Recent Activity</h2>
      </div>
      <div className='divide-y divide-slate-200'>
        {activities.map((activity, index) => (
          <div key={index} className='p-4 hover:bg-slate-50 transition-colors'>
            <div className='flex items-start gap-4'>
              <div className='mt-1'>{activity.icon}</div>
              <div className='flex-1'>
                <p className='text-slate-900 mb-1'>{activity.text}</p>
                <p className='text-xs text-slate-500'>{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
