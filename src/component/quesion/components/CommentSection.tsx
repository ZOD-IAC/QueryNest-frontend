// ============================================
// FILE: components/question/CommentSection.tsx
// ============================================
interface CommentSectionProps {
  comments: Comment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
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
