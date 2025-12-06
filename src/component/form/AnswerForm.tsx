'use client';
import { X } from 'lucide-react';
import Button from '../Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';

interface prop {
  questionId: string;
}
// Ask Question Form Component
const AnswerForm: React.FC<prop> = ({ questionId }) => {
  const dispatch = useDispatch();
  const [isCode, setIsCode] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    code: '',
    questionId,
  });

  const handleError = (message: string) => {
    if (!message) return;
    dispatch(
      showMessage({
        message: message,
        messageType: 'error',
      })
    );
  };

  const handleCheck = () => {
    const { content, code } = formData;

    if (content.split(' ').length < 20) {
      handleError('Minimum 20 words are required for content !');
      return false;
    }
    if (isCode && code.length < 0) {
      handleError('Code is require , turn it off if not required !');
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!handleCheck()) {
      console.log('check all the fields');
      return;
    }

    try {
      const auth = localStorage.getItem('auth');
      const { token } = JSON.parse(auth as string);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/answer/api/write-answer/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!data.ok) {
        handleError(data?.message);
        throw new Error(data.message);
      }
      dispatch(showMessage({ message: data.message, messageType: 'success' }));
      setFormData({
        ...formData,
        code: '',
        content: '',
      });
      return;
    } catch (error) {
      console.warn('Error :', error);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-6`}>
      <div className='px-2 py-4 border-b border-slate-200 mb-5'>
        <h2 className='text-2xl font-bold text-slate-900'>Answer Question</h2>
      </div>
      <div className='space-y-4 text-black'>
        <div>
          <label className='block text-sm font-medium text-slate-900 mb-2'>
            Description
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder='Include all the information someone would need to answer your question...'
            rows={8}
            className='placeholder:text-slate-400 w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none'
          />
          <p className='text-xs text-slate-500 mt-1'>
            Provide context, what you&apos;ve tried, and what you expect
          </p>
        </div>

        <div className='flex space-x-2 items-center'>
          <label className='flex items-center gap-1'>code</label>
          <input
            type='checkbox'
            defaultChecked={isCode}
            onChange={() => {
              setFormData({
                ...formData,
                code: '',
              });
              setIsCode((s) => !s);
            }}
          />
        </div>
        {isCode && (
          <div>
            <label className='block text-sm font-medium text-slate-900 mb-2'>
              Code
            </label>
            <textarea
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder='share your code or any other extra information here..'
              rows={8}
              className='placeholder:text-slate-400 w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none'
            />
            <p className='text-xs text-slate-500 mt-1'>
              Provide Extra context or code, what you&apos;ve tried.
            </p>
          </div>
        )}

        <div className='flex gap-3 pt-4'>
          <Button variant='primary' fullWidth onClick={handleSubmit}>
            Post Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerForm;
