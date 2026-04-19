'use client';
import { X } from 'lucide-react';
import Button from '../Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';
import { BASE_URL } from '@/utils/Setting';
import CustomEditor from '../editor/CustomEditor';
import DebounceSelect from '../common/DebounceSelect';
import { getQuestionTags } from '../../api/question/index'

// Ask Question Form Component
const AskQuestionForm: React.FC = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState([]);

  // const addTag = () => {
  //   if (tagInput && !formData.tags.includes(tagInput)) {
  //     setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
  //     setTagInput('');
  //   }
  // };

  // const removeTag = (tagToRemove: string) => {
  //   setFormData({
  //     ...formData,
  //     tags: formData.tags.filter((tag) => tag !== tagToRemove),
  //   });
  // };

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
    const { title, tags } = formData;

    if (!title || !content || tags.length <= 0) {
      handleError('All fields are required !');
      return false;
    }

    if (title.split(' ').length < 5) {
      handleError('Minimum 5 words are required for title !');
      return false;
    }

    if (content.split(' ').length < 20) {
      handleError('Minimum 20 words are required for content !');
      return false;
    }

    if (tags.length <= 0) {
      handleError('Alteast 1 tag is required to ask question !');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!handleCheck()) {
      dispatch(
        showMessage({
          message: 'All fields are required!',
          messageType: 'error',
        }),
      );
      return;
    }

    try {
      const auth = localStorage.getItem('auth');
      const { token } = JSON.parse(auth);

      const res = await fetch(`${BASE_URL}/question/add-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, content }),
      });
      const data = await res.json();

      if (!data.ok) {
        handleError(data?.message);
        throw new Error(data.message);
      }
      dispatch(showMessage({ message: data.message, messageType: 'success' }));
      setFormData({
        title: '',
        tags: [],
      });
      setContent('');
      return;
    } catch (error) {
      console.warn('Error :', error);
    }
  };

  const fetchTags = async (query) => {
    const res = await getQuestionTags(query);
    return res?.data || [];
  };

  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-6`}>
      <div className='px-2 py-4 border-b border-slate-200'>
        <h2 className='text-2xl font-bold text-slate-900'>Ask Question</h2>
      </div>
      <div className='space-y-4 text-black'>
        <div>
          <label className='block text-sm font-medium text-slate-900 mb-2'>
            Title
          </label>
          <input
            type='text'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder='e.g., How to center a div in CSS?'
            className='placeholder:text-slate-400 w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
          <p className='text-xs text-slate-500 mt-1'>
            Be specific and imagine you&apos;re asking a question to another
            person
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-slate-900 mb-2'>
            Description
          </label>
          <CustomEditor onChange={setContent} value={content} />
          <p className='text-xs text-slate-500 mt-1'>
            Provide context, what you&apos;ve tried, and what you expect
          </p>
        </div>
        <DebounceSelect
          value={tagInput}
          onChange={setTagInput}
          fetchTags={fetchTags}
          multiple={true}
          max={5}
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

export default AskQuestionForm;
