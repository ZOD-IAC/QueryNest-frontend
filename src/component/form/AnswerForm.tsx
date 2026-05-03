'use client';
import Button from '../Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';
import { BASE_URL } from '@/utils/Setting';
import CustomEditor from '../../component/editor/CustomEditor';

interface prop {
  questionId: Number;
}
// Ask Question Form Component
const AnswerForm: React.FC<prop> = ({ questionId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleError = (message: string) => {
    if (!message) return;
    dispatch(
      showMessage({
        message: message,
        messageType: 'error',
      }),
    );
  };

  const handleCheck = () => {

    if (content.split(' ').length < 20) {
      handleError('Minimum 20 words are required for content !');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!handleCheck()) {
      dispatch(showMessage({
        message :'check all the fields',
        messageType : 'error'
      }));
      return;
    }

    try {
      const auth = localStorage.getItem('auth');
      const { token } = JSON.parse(auth as string);

      const res = await fetch(`${BASE_URL}/answer/api/write-answer/`, {
        method: 'POST',
        body: JSON.stringify({content : content , questionId : questionId,}),
      });
      const data = await res.json();

      if (!data.ok) {
        handleError(data?.message);
        throw new Error(data.message);
      }
      dispatch(showMessage({ message: data.message, messageType: 'success' }));
      setContent('');
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
         
          <p className='text-xs text-slate-500 mt-1'>
            Provide context, what you&apos;ve tried, and what you expect
          </p>
        </div>
        
        <CustomEditor
          value={content}
          onChange={setContent}
          placeholder='type your answer here..'
        />
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
