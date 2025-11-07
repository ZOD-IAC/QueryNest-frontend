'use client';
import { X } from 'lucide-react';
import Button from '../Button/Button';
import { useState } from 'react';

// Ask Question Form Component
const AskQuestionForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <div className='bg-white rounded-lg border border-slate-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-slate-800'>Ask a Question</h2>
        <button
          onClick={onClose}
          className='text-slate-400 hover:text-slate-600'
        >
          <X className='w-6 h-6' />
        </button>
      </div>

      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Title
          </label>
          <input
            type='text'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder='e.g., How to center a div in CSS?'
            className='w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <p className='text-xs text-slate-500 mt-1'>
            Be specific and imagine you're asking a question to another person
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Description
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder='Include all the information someone would need to answer your question...'
            rows={8}
            className='w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
          />
          <p className='text-xs text-slate-500 mt-1'>
            Provide context, what you've tried, and what you expect
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Tags
          </label>
          <div className='flex gap-2 mb-2'>
            <input
              type='text'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addTag())
              }
              placeholder='Add a tag (press Enter)'
              className='flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
          <Button variant='primary' fullWidth>
            Post Question
          </Button>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionForm;
