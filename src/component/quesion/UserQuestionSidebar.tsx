import { Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import Button from '../Button/Button';

// Types
interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  isAnswered: boolean;
}

// User Questions Sidebar Component
const UserQuestionsSidebar: React.FC<{ isLoggedIn: boolean }> = ({
  isLoggedIn,
}) => {
  const userQuestions: Question[] = [
    {
      id: 101,
      title: 'How to handle CORS in Express?',
      content: '',
      author: 'Current User',
      authorAvatar: '',
      tags: ['Express', 'CORS'],
      votes: 12,
      answers: 3,
      views: 456,
      createdAt: '2 days ago',
      isAnswered: true,
    },
    {
      id: 102,
      title: 'React useState vs useReducer',
      content: '',
      author: 'Current User',
      authorAvatar: '',
      tags: ['React', 'Hooks'],
      votes: 8,
      answers: 1,
      views: 234,
      createdAt: '1 week ago',
      isAnswered: false,
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className='bg-slate-50 border border-slate-200 rounded-lg p-6'>
        <h3 className='font-semibold text-slate-800 mb-3'>Your Questions</h3>
        <p className='text-sm text-slate-600 mb-4'>
          Log in to see your questions and track answers
        </p>
        <Button variant='primary' size='sm' fullWidth>
          Log In
        </Button>
      </div>
    );
  }

  return (
    <div className='bg-white border border-slate-200 rounded-lg p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold text-slate-800'>Your Questions</h3>
        <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full'>
          {userQuestions.length}
        </span>
      </div>
      <div className='space-y-3'>
        {userQuestions.map((q) => (
          <div
            key={q.id}
            className='pb-3 border-b border-slate-100 last:border-0'
          >
            <h4 className='text-sm font-medium text-slate-800 hover:text-blue-600 cursor-pointer mb-2 line-clamp-2'>
              {q.title}
            </h4>
            <div className='flex items-center gap-3 text-xs text-slate-500'>
              <span className='flex items-center gap-1'>
                <ThumbsUp className='w-3 h-3' />
                {q.votes}
              </span>
              <span
                className={`flex items-center gap-1 ${
                  q.isAnswered ? 'text-green-600' : ''
                }`}
              >
                <MessageSquare className='w-3 h-3' />
                {q.answers}
              </span>
              <span className='flex items-center gap-1'>
                <Eye className='w-3 h-3' />
                {q.views}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button variant='ghost' size='sm' fullWidth href='profile?tab=questions'>
        View All
      </Button>
    </div>
  );
};

export default UserQuestionsSidebar;
