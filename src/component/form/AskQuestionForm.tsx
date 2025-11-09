'use client';
import { X } from 'lucide-react';
import Button from '../Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';

// Ask Question Form Component
const AskQuestionForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isCode, setIsCode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    code: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

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
    const { title, content, code, tags } = formData;

    if (!title || !content || !tags.length) {
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
    if (isCode && code.length < 0) {
      handleError('Code is require , turn it off if not required !');
    }

    if (tags.length <= 0) {
      handleError('Alteast 1 tag is required to ask question !');
      return false;
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
      const { token } = JSON.parse(auth);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/question/add-question`,
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
        code: '',
        content: '',
        title: '',
        tags: [],
      });
      return;
    } catch (error) {
      console.warn('Error :', error);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-6`}>
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
        <div>
          <label className='block text-sm font-medium text-slate-900 mb-2'>
            Tags
          </label>
          <div className='flex gap-2 mb-2'>
            <input
              type='text'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onClick={(e) => {
                e.preventDefault();
                addTag();
              }}
              placeholder='Add a tag (press Enter)'
              className='placeholder:text-slate-400 flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <Button onClick={addTag} variant='outline'>
              Add
            </Button>
          </div>
          <div className='flex flex-wrap gap-2 mb-2'>
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className='px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-2'
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className='hover:text-blue-900'
                >
                  <X className='w-3 h-3' />
                </button>
              </span>
            ))}
          </div>
          <p className='text-xs text-slate-500'>
            Add up to 5 tags to describe what your question is about
          </p>
        </div>

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
