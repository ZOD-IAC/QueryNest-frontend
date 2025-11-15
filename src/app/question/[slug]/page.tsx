"use client"
import React, { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Flag,
  Eye,
  MessageSquare,
  Clock,
  Award,
  CheckCircle,
  Code,
  Copy,
  Check,
  Star,
  Edit,
  Trash2,
  MoreVertical,
} from 'lucide-react';

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

interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    username: string;
    reputation: number;
  };
  createdAt: string;
}

// ============================================
// FILE: components/question/VoteButtons.tsx
// ============================================
interface VoteButtonsProps {
  votes: number;
  userVote?: 'up' | 'down' | null;
  onVote: (type: 'up' | 'down') => void;
  size?: 'sm' | 'md';
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  votes,
  userVote,
  onVote,
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = size === 'sm' ? 'text-lg' : 'text-2xl';

  return (
    <div className='flex flex-col items-center gap-2'>
      <button
        onClick={() => onVote('up')}
        className={`${sizeClasses} rounded-lg border-2 flex items-center justify-center transition-all ${
          userVote === 'up'
            ? 'bg-green-100 border-green-500 text-green-600'
            : 'border-slate-300 text-slate-600 hover:bg-green-50 hover:border-green-400'
        }`}
      >
        <ThumbsUp className={iconSize} />
      </button>
      <span
        className={`font-bold ${
          votes > 0
            ? 'text-green-600'
            : votes < 0
            ? 'text-red-600'
            : 'text-slate-700'
        } ${textSize}`}
      >
        {votes}
      </span>
      <button
        onClick={() => onVote('down')}
        className={`${sizeClasses} rounded-lg border-2 flex items-center justify-center transition-all ${
          userVote === 'down'
            ? 'bg-red-100 border-red-500 text-red-600'
            : 'border-slate-300 text-slate-600 hover:bg-red-50 hover:border-red-400'
        }`}
      >
        <ThumbsDown className={iconSize} />
      </button>
    </div>
  );
};

// ============================================
// FILE: components/question/CodeBlock.tsx
// ============================================
interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='bg-slate-900 rounded-lg overflow-hidden my-4'>
      <div className='flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700'>
        <div className='flex items-center gap-2'>
          <Code className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-300'>{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className='flex items-center gap-2 px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm transition-colors'
        >
          {copied ? (
            <>
              <Check className='w-4 h-4' />
              Copied!
            </>
          ) : (
            <>
              <Copy className='w-4 h-4' />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className='p-4 overflow-x-auto'>
        <code className='text-sm text-slate-100 font-mono'>{code}</code>
      </pre>
    </div>
  );
};

// ============================================
// FILE: components/question/QuestionHeader.tsx
// ============================================
interface QuestionHeaderProps {
  question: QuestionData;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({ question }) => {
  return (
    <div className='bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-slate-900 mb-4'>
          {question.title}
        </h1>
        <div className='flex flex-wrap items-center gap-4 text-sm text-slate-600'>
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
  );
};

// ============================================
// FILE: components/question/QuestionContent.tsx
// ============================================
interface QuestionContentProps {
  question: QuestionData;
  onVote: (type: 'up' | 'down') => void;
  onBookmark: () => void;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  onVote,
  onBookmark,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='bg-white rounded-lg border border-slate-200 p-6'>
      <div className='flex gap-6'>
        {/* Vote Section */}
        <div className='flex-shrink-0'>
          <VoteButtons
            votes={question.votes}
            userVote={question.userVote}
            onVote={onVote}
          />
          <button
            onClick={onBookmark}
            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center mt-4 transition-all ${
              question.isBookmarked
                ? 'bg-amber-100 border-amber-500 text-amber-600'
                : 'border-slate-300 text-slate-600 hover:bg-amber-50 hover:border-amber-400'
            }`}
          >
            <Bookmark
              className='w-5 h-5'
              fill={question.isBookmarked ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className='flex-1 min-w-0'>
          <div className='prose max-w-none mb-4'>
            <p className='text-slate-700 leading-relaxed whitespace-pre-wrap'>
              {question.content}
            </p>
          </div>

          {question.code && (
            <CodeBlock code={question.code} language={question.codeLanguage} />
          )}

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mb-6'>
            {question.tags.map((tag) => (
              <span
                key={tag}
                className='px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-200 hover:bg-blue-100 cursor-pointer'
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions and Author */}
          <div className='flex items-center justify-between pt-4 border-t border-slate-200'>
            <div className='flex gap-2'>
              <button className='flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Share2 className='w-4 h-4' />
                Share
              </button>
              <button className='flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Edit className='w-4 h-4' />
                Edit
              </button>
              <button className='flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Flag className='w-4 h-4' />
                Flag
              </button>
            </div>

            {/* Author Card */}
            <div className='bg-blue-50 rounded-lg p-3 border border-blue-100'>
              <div className='text-xs text-blue-600 mb-2'>
                asked {question.createdAt}
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold'>
                  {question.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className='font-semibold text-slate-900 hover:text-blue-600 cursor-pointer'>
                    {question.author.name}
                  </div>
                  <div className='flex items-center gap-2 text-xs'>
                    <span className='text-slate-600'>
                      @{question.author.username}
                    </span>
                    <span className='text-slate-400'>•</span>
                    <div className='flex items-center gap-1 text-amber-600'>
                      <Star className='w-3 h-3' fill='currentColor' />
                      <span className='font-semibold'>
                        {question.author.reputation.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILE: components/question/CommentSection.tsx
// ============================================
interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');

  return (
    <div className='mt-4 border-t border-slate-200 pt-4'>
      <div className='space-y-3'>
        {comments.map((comment) => (
          <div key={comment.id} className='flex gap-3 text-sm'>
            <div className='flex-1'>
              <span className='text-slate-700'>{comment.content}</span>
              <span className='mx-2 text-slate-400'>–</span>
              <span className='text-blue-600 hover:text-blue-700 cursor-pointer font-medium'>
                {comment.author.name}
              </span>
              <span className='mx-2 text-slate-400'>•</span>
              <span className='text-slate-500'>{comment.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {showCommentForm ? (
        <div className='mt-3'>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Add a comment...'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
            rows={2}
          />
          <div className='flex gap-2 mt-2'>
            <button className='px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700'>
              Add Comment
            </button>
            <button
              onClick={() => setShowCommentForm(false)}
              className='px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50'
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCommentForm(true)}
          className='mt-3 text-sm text-slate-600 hover:text-slate-900'
        >
          Add a comment
        </button>
      )}
    </div>
  );
};

// ============================================
// FILE: components/question/AnswerCard.tsx
// ============================================
interface AnswerCardProps {
  answer: AnswerData;
  onVote: (type: 'up' | 'down') => void;
  onAccept?: () => void;
  isQuestionAuthor: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  onVote,
  onAccept,
  isQuestionAuthor,
}) => {
  return (
    <div
      className={`bg-white rounded-lg border-2 p-6 ${
        answer.isAccepted ? 'border-green-500 bg-green-50' : 'border-slate-200'
      }`}
    >
      {answer.isAccepted && (
        <div className='flex items-center gap-2 mb-4 text-green-700 font-semibold'>
          <CheckCircle className='w-5 h-5' fill='currentColor' />
          <span>Accepted Answer</span>
        </div>
      )}

      <div className='flex gap-6'>
        {/* Vote Section */}
        <div className='flex-shrink-0'>
          <VoteButtons
            votes={answer.votes}
            userVote={answer.userVote}
            onVote={onVote}
            size='sm'
          />
          {isQuestionAuthor && !answer.isAccepted && (
            <button
              onClick={onAccept}
              className='w-8 h-8 rounded-lg border-2 border-slate-300 flex items-center justify-center mt-3 hover:bg-green-50 hover:border-green-500 text-slate-600 hover:text-green-600 transition-all'
              title='Accept this answer'
            >
              <CheckCircle className='w-4 h-4' />
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className='flex-1 min-w-0'>
          <div className='prose max-w-none mb-4'>
            <p className='text-slate-700 leading-relaxed whitespace-pre-wrap'>
              {answer.content}
            </p>
          </div>

          {answer.code && (
            <CodeBlock code={answer.code} language={answer.codeLanguage} />
          )}

          {/* Actions and Author */}
          <div className='flex items-center justify-between pt-4 border-t border-slate-200'>
            <div className='flex gap-2'>
              <button className='flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Share2 className='w-4 h-4' />
                Share
              </button>
              <button className='flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Edit className='w-4 h-4' />
                Edit
              </button>
              <button className='flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
                <Flag className='w-4 h-4' />
                Flag
              </button>
            </div>

            {/* Author Card */}
            <div className='bg-slate-50 rounded-lg p-3 border border-slate-200'>
              <div className='text-xs text-slate-600 mb-2'>
                answered {answer.createdAt}
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold'>
                  {answer.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className='font-semibold text-slate-900 hover:text-blue-600 cursor-pointer'>
                    {answer.author.name}
                  </div>
                  <div className='flex items-center gap-2 text-xs'>
                    <span className='text-slate-600'>
                      @{answer.author.username}
                    </span>
                    <span className='text-slate-400'>•</span>
                    <div className='flex items-center gap-1 text-amber-600'>
                      <Star className='w-3 h-3' fill='currentColor' />
                      <span className='font-semibold'>
                        {answer.author.reputation.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <CommentSection comments={mockComments} />
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILE: components/question/AnswerForm.tsx
// ============================================
const AnswerForm: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  return (
    <div className='bg-white rounded-lg border border-slate-200 p-6'>
      <h2 className='text-xl font-bold text-slate-900 mb-4'>Your Answer</h2>

      <div className='space-y-4'>
        <div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder='Write your answer here...'
            className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
            rows={8}
          />
        </div>

        {showCodeEditor ? (
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Code (optional)
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='Paste your code here...'
              className='w-full px-4 py-3 border border-slate-300 rounded-lg font-mono text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              rows={10}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowCodeEditor(true)}
            className='flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50'
          >
            <Code className='w-4 h-4' />
            Add Code Snippet
          </button>
        )}

        <div className='flex gap-3 pt-4'>
          <button className='px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'>
            Post Your Answer
          </button>
          <button className='px-6 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium'>
            Preview
          </button>
        </div>
      </div>

      <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
        <h3 className='font-semibold text-slate-900 mb-2 text-sm'>
          Tips for great answers:
        </h3>
        <ul className='space-y-1 text-sm text-slate-600'>
          <li>• Be clear and concise</li>
          <li>• Include code examples when relevant</li>
          <li>• Explain why your solution works</li>
          <li>• Test your code before posting</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// FILE: components/question/RelatedQuestions.tsx
// ============================================
const RelatedQuestions: React.FC = () => {
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

// ============================================
// FILE: pages/QuestionDetailPage.tsx
// ============================================
const QuestionDetailPage: React.FC = () => {
  const [question, setQuestion] = useState<QuestionData>(mockQuestion);
  const [answers, setAnswers] = useState<AnswerData[]>(mockAnswers);

  const handleQuestionVote = (type: 'up' | 'down') => {
    setQuestion((prev) => ({
      ...prev,
      votes: type === 'up' ? prev.votes + 1 : prev.votes - 1,
      userVote: prev.userVote === type ? null : type,
    }));
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
    setQuestion((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };

  const handleAcceptAnswer = (answerId: number) => {
    setAnswers((prev) =>
      prev.map((a) => ({ ...a, isAccepted: a.id === answerId }))
    );
  };

  const isQuestionAuthor = true;

  return (
    <div className='min-h-screen bg-slate-50'>
      <QuestionHeader question={question} />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid lg:grid-cols-12 gap-6'>
          {/* Main Content */}
          <main className='lg:col-span-9 space-y-6'>
            <QuestionContent
              question={question}
              onVote={handleQuestionVote}
              onBookmark={handleBookmark}
            />

            {/* Answers Section */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <h2 className='text-2xl font-bold text-slate-900 mb-6'>
                {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
              </h2>
              <div className='space-y-6'>
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

            <AnswerForm />
          </main>

          {/* Sidebar */}
          <aside className='lg:col-span-3 space-y-6'>
            <RelatedQuestions />
          </aside>
        </div>
      </div>
    </div>
  );
};

// Mock Data
const mockQuestion: QuestionData = {
  id: 1,
  title: 'How to implement authentication in React with TypeScript?',
  content:
    "I'm building a React application with TypeScript and need to implement user authentication. I want to use JWT tokens for authentication and protect certain routes.\n\nI've tried implementing it but I'm getting type errors with the token storage. Here's what I have so far:",
  code: `interface User {
  id: string;
  email: string;
  name: string;
}

const [user, setUser] = useState<User | null>(null);

const login = async (email: string, password: string) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  setUser(data.user);
};`,
  codeLanguage: 'typescript',
  tags: ['React', 'TypeScript', 'Authentication', 'JWT'],
  author: {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    reputation: 1250,
    avatar: '',
  },
  votes: 42,
  views: 1203,
  createdAt: '2 hours ago',
  updatedAt: '1 hour ago',
  isBookmarked: false,
  userVote: null,
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

const mockComments: Comment[] = [
  {
    id: 1,
    content: 'This is exactly what I was looking for! Works perfectly.',
    author: { name: 'Alex Brown', username: 'alexb', reputation: 234 },
    createdAt: '20 mins ago',
  },
  {
    id: 2,
    content: "Don't forget to handle token expiration!",
    author: { name: 'Emma Davis', username: 'emmad', reputation: 567 },
    createdAt: '15 mins ago',
  },
];

export default QuestionDetailPage;
