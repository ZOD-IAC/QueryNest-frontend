'use client';
import { useEffect, useState } from 'react';
import { addQuestionTag } from '@/api/question';

export default function DebounceSelect({
  value = [],
  onChange,
  fetchTags,
  multiple = true,
  max = 5,
  placeholder = 'Search or add tag...',
}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Debounce search
  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchTags(input);
        setSuggestions(res || []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  // ➕ Add tag (always object-based)
  const addTag = async (tag) => {
    if (!tag) return;

    let finalTag = tag;

    try {
      // if it's string → create
      if (typeof tag === 'string') {
        const res = await addQuestionTag(tag);
        if (res?.ok) finalTag = res.newtag;
        else return;
      }
    } catch (err) {
      console.error(err);
      return;
    }

    // dedupe by _id
    const exists = value.some((t) => t._id === finalTag._id);
    if (exists) return;

    let updated = multiple ? [...value, finalTag] : [finalTag];
    if (multiple && updated.length > max) return;

    onChange(updated);
    setInput('');
    setSuggestions([]);
  };

  // ❌ Remove
  const removeTag = (id) => {
    onChange(value.filter((t) => t._id !== id));
  };

  // ⌨️ Enter = create
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div className='w-full'>
      {/* Input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='w-full px-3 py-2 border rounded'
      />

      {/* Suggestions */}
      {input && (
        <div className='border mt-1 rounded bg-white max-h-40 overflow-auto'>
          {loading && <p className='p-2 text-sm'>Loading...</p>}

          {!loading &&
            suggestions.map((tag) => (
              <div
                key={tag._id}
                onClick={() => addTag(tag)}
                className='p-2 hover:bg-gray-100 cursor-pointer text-black'
              >
                {tag.tagName}
              </div>
            ))}

          {!loading && suggestions.length === 0 && (
            <div
              onClick={() => addTag(input)}
              className='p-2 text-blue-600 cursor-pointer'
            >
              Create "{input}"
            </div>
          )}
        </div>
      )}

      {/* Selected Tags */}
      <div className='flex flex-wrap gap-2 mt-2'>
        {value.map((tag) => (
          <span
            key={tag._id}
            className='px-2 py-1 bg-blue-100 rounded flex items-center gap-1'
          >
            {tag.tagName}
            <button onClick={() => removeTag(tag._id)}>✕</button>
          </span>
        ))}
      </div>

      {/* Clear */}
      {value.length > 0 && (
        <button
          onClick={() => onChange([])}
          className='text-xs text-red-500 mt-1'
        >
          Clear all
        </button>
      )}
    </div>
  );
}
