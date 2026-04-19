'use client';
import { addQuestionTag } from '@/api/question';
import { useEffect, useState } from 'react';

export default function DebounceSelect({
  value = [],
  onChange,
  fetchTags, // (query) => Promise<tag[]>
  multiple = true,
  max = 5,
  placeholder = 'Search or add tag...',
}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Debounce API call
  useEffect(() => {
    if (!input.trim()) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchTags(input);
        setSuggestions(res || []);
        console.log(suggestions, '<<--- suggestions');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  // ➕ Add tag
  const addTag = async (tag) => {
    if (!tag) return;

    let finalTag = tag;

    try {
      // 🔥 only create if it's not from suggestions
      if (!suggestions.includes(tag)) {
        const res = await addQuestionTag(tag);

        if (res?.ok) {
          finalTag = res.newtag.tagName; // or use slug / id later
        }
      }
    } catch (err) {
      console.error(err);
      return;
    }

    let updated = multiple ? [...value, finalTag] : [finalTag];

    updated = [...new Set(updated)];

    if (multiple && updated.length > max) return;

    onChange(updated);
    setInput('');
    setSuggestions([]);
  };

  // ❌ Remove tag
  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  // ⌨️ Enter key = add/create
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
            suggestions.length > 0 &&
            suggestions.map((tag, i) => (
              <div
                key={i}
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
        {value.map((tag, i) => (
          <span
            key={i}
            className='px-2 py-1 bg-blue-100 rounded flex items-center gap-1'
          >
            {tag}
            <button onClick={() => removeTag(tag)}>✕</button>
          </span>
        ))}
      </div>

      {/* Clear all */}
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
