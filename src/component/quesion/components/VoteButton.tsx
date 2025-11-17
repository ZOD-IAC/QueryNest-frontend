// ============================================
// FILE: components/question/VoteButtons.tsx
// ============================================

import { ThumbsDown, ThumbsUp } from "lucide-react";
interface VoteButtonsProps {
  votes: number;
  userVote?: 'up' | 'down' | null;
  onVote: (type: 'up' | 'down') => void;
  size?: 'sm' | 'md';
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({
  votes,
  userVote,
  onVote,
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = size === 'sm' ? 'text-lg' : 'text-2xl';

  return (
    <div className='flex flex-row md:flex-col items-center gap-2'>
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
