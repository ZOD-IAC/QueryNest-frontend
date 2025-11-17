'use client';

import { CheckCircle, Edit, Flag, Share2, Star } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { VoteButtons } from './VoteButton';
// import { CommentSection } from '../QuestionDetailPage';

interface AnswerCardProps {
  answer: AnswerData;
  onVote: (type: 'up' | 'down') => void;
  onAccept?: () => void;
  isQuestionAuthor: boolean;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  onVote,
  onAccept,
  isQuestionAuthor,
}) => {
  return (
    <div
      className={`bg-white rounded-lg border-2 p-4 sm:p-6${
        answer.isAccepted
          ? ' border-green-500 bg-green-50'
          : ' border-slate-200'
      }`}
    >
      {answer.isAccepted && (
        <div className='flex items-center gap-2 mb-4 text-green-700 font-semibold text-sm'>
          <CheckCircle className='w-5 h-5' fill='currentColor' />
          <span>Accepted Answer</span>
        </div>
      )}

      <div className='flex flex-col md:flex-row gap-4 sm:gap-6'>
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
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between pt-4 border-t border-slate-200 gap-4 w-full'>
            <div className='flex gap-1 sm:gap-2 flex-wrap'>
              <button className='flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap'>
                <Share2 className='w-4 h-4' />
                <span className='hidden sm:inline'>Share</span>
              </button>
              <button className='flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap'>
                <Edit className='w-4 h-4' />
                <span className='hidden sm:inline'>Edit</span>
              </button>
            </div>

            {/* Author Card */}
            <div className='bg-slate-50 rounded-lg p-3 border border-slate-200 w-full md:w-auto'>
              <div className='text-xs text-slate-600 mb-2'>
                answered {answer.createdAt}
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm'>
                  {answer.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className='font-semibold text-slate-900 hover:text-blue-600 cursor-pointer text-sm'>
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
          {/* <CommentSection comments={mockComments} /> */}
        </div>
      </div>
    </div>
  );
};

// const mockComments: Comment[] = [
//   {
//     id: 1,
//     content: 'This is exactly what I was looking for! Works perfectly.',
//     author: { name: 'Alex Brown', username: 'alexb', reputation: 234 },
//     createdAt: '20 mins ago',
//   },
//   {
//     id: 2,
//     content: "Don't forget to handle token expiration!",
//     author: { name: 'Emma Davis', username: 'emmad', reputation: 567 },
//     createdAt: '15 mins ago',
//   },
// ];
