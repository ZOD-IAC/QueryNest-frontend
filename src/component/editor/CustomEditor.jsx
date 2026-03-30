'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect } from 'react'
import Toolbar from './Toolbar'

const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  maxLength = null,
  minHeight = '200px',
  maxHeight = null,
  readOnly = false,
  showCharCount = false,
  toolbarConfig = 'full',
  className = '',
  error = '',
  label = '',
  required = false,
}) => {
  const editor = useEditor({
    immediatelyRender : false,
    extensions: [
      StarterKit.configure({
        // Enable H1 through H4
        heading: { levels: [1, 2, 3, 4] },
        bulletList:  { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
      ...(maxLength ? [CharacterCount.configure({ limit: maxLength })] : []),
    ],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange?.(editor.isEmpty ? '' : editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'rte-body focus:outline-none px-3 py-3',
        style: `min-height: ${minHeight}; ${maxHeight ? `max-height: ${maxHeight}; overflow-y: auto;` : ''}`,
      },
    },
  })

  // Sync external value changes
  useEffect(() => {
    if (!editor) return
    const incoming = value || ''
    if (editor.getHTML() !== incoming && !editor.isFocused) {
      editor.commands.setContent(incoming, false)
    }
  }, [value, editor])

  // Sync readOnly prop
  useEffect(() => {
    editor?.setEditable(!readOnly)
  }, [readOnly, editor])

  const charCount = editor?.storage?.characterCount?.characters?.() ?? 0
  const isOverLimit = maxLength && charCount >= maxLength

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>

      {label && (
        <label className="text-sm font-medium text-gray-700 flex items-center gap-0.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className={[
        'rounded-lg border bg-white overflow-hidden transition-all duration-150',
        readOnly
          ? 'bg-gray-50 border-gray-200'
          : error
            ? 'border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100'
            : 'border-gray-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100',
      ].join(' ')}>
        {!readOnly && <Toolbar editor={editor} config={toolbarConfig} />}
        <EditorContent editor={editor} />
      </div>

      {(error || (showCharCount && maxLength)) && (
        <div className="flex items-center justify-between px-0.5 min-h-[18px]">
          <span className="text-xs text-red-500">{error}</span>
          {showCharCount && maxLength && (
            <span className={`text-xs ml-auto tabular-nums ${isOverLimit ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
              {charCount} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default RichTextEditor