'use client';
import React, { useEffect, useState } from 'react';
import { Eye, Clock, Edit } from 'lucide-react';
import AnswerForm from '@/component/form/AnswerForm';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';
import { QuestionContent } from './components/QuestionContent';
import { AnswerCard } from './components/AnswerCard';
import { RelatedQuestions } from './components/RelatedQuestion';

// ============================================
// FILE: types/question.types.ts
// ============================================
interface QuestionData {
  id: number;
  title: string;
  content: string;
  code?: string;
  codeLanguage?: string;
  tags: string[];
  author: {
    id: number;
    name: string;
    username: string;
    reputation: number;
    avatar: string;
  };
  votes: number;
  views: number;
  createdAt: string;
  updatedAt?: string;
  isBookmarked: boolean;
  userVote?: 'up' | 'down' | null;
}

interface AnswerData {
  id: number;
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
interface pageProp {
  questionId: string;
}
// ============================================
// FILE: pages/QuestionDetailPage.tsx
// ============================================
const QuestionDetailPage: React.FC<pageProp> = ({ questionId }) => {
  const [question, setQuestion] = useState<QuestionData>();
  const [answers, setAnswers] = useState<AnswerData[]>(mockAnswers);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/question/api/get-question/${questionId}`,
        {
          method: 'GET',
        }
      );

      const data = await res.json();

      if (!data) {
        dispatch(
          showMessage({
            message: data.message,
            messageType: 'error',
          })
        );
        return;
      }
      setQuestion(data.question);
    };

    fetchQuestion();
  }, []);

  const handleQuestionVote = (type: 'up' | 'down') => {
    // setQuestion((prev) => ({
    //   ...prev,
    //   votes: type === 'up' ? prev.votes + 1 : prev.votes - 1,
    //   userVote: prev.userVote === type ? null : type,
    // }));
  };

  const handleAnswerVote = (answerId: number, type: 'up' | 'down') => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.id === answerId
          ? {
              ...a,
              votes: type === 'up' ? a.votes + 1 : a.votes - 1,
              userVote: a.userVote === type ? null : type,
            }
          : a
      )
    );
  };

  const handleBookmark = () => {
    // setQuestion((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };

  const handleAcceptAnswer = (answerId: number) => {
    setAnswers((prev) =>
      prev.map((a) => ({ ...a, isAccepted: a.id === answerId }))
    );
  };

  const isQuestionAuthor = true;
  if (!question) return;
  console.log(question, '<--- question id');

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
                {answers.map((answer) => (
                  <AnswerCard
                    key={answer.id}
                    answer={answer}
                    onVote={(type) => handleAnswerVote(answer.id, type)}
                    onAccept={() => handleAcceptAnswer(answer.id)}
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

const mockAnswers: AnswerData[] = [
  {
    id: 1,
    content:
      "Here's a complete solution using React Context and TypeScript. First, create an AuthContext to manage the authentication state throughout your app.\n\nThe key points are:\n1. Use Context API to share auth state globally\n2. Store JWT in localStorage\n3. Create a custom hook for easy access\n4. Add proper TypeScript types",
    code: `// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};`,
    codeLanguage: 'typescript',
    author: {
      id: 2,
      name: 'Sarah Wilson',
      username: 'sarahw',
      reputation: 8540,
      avatar: '',
    },
    votes: 156,
    isAccepted: true,
    createdAt: '1 hour ago',
    userVote: null,
  },
  {
    id: 2,
    content:
      'You can also use a library like react-query or SWR to handle the authentication state. This approach gives you automatic refetching and caching capabilities.',
    author: {
      id: 3,
      name: 'Mike Chen',
      username: 'mikechen',
      reputation: 4230,
      avatar: '',
    },
    votes: 23,
    isAccepted: false,
    createdAt: '30 minutes ago',
    userVote: null,
  },
];

export default QuestionDetailPage;
