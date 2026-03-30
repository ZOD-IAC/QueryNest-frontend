'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { useEditorState } from '@tiptap/react'

// ── Inline SVG icon ───────────────────────────────────────────────────────────
const Icon = ({ d, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const ChevronDown = () => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const ICONS = {
  bold:        'M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z',
  italic:      'M19 4h-9M14 20H5M15 4L9 20',
  underline:   'M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16',
  strike:      'M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.1 2.4 3.9 3.1l.3.1m5 2.4c2.3.6 4.4 1.3 4.4 3.6 0 2.9-2.7 3.6-5.3 3.6-1.9 0-3.9-.4-6.2-.9M4 12h16',
  ul:          'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  ol:          'M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1',
  blockquote:  'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z',
  code:        'M16 18l6-6-6-6M8 6l-6 6 6 6',
  alignLeft:   'M21 10H3M21 6H3M21 14H3M21 18H11',
  alignCenter: 'M21 10H3M21 6H3M17 14H7M21 18H3',
  alignRight:  'M21 10H3M21 6H3M21 14H3M11 18h10',
  link:        'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  unlink:      'M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71 M13.75 11.75l-4.5 4.5 M11.25 12.25l-4.5 4.5 M5.16 11.75l-1.72 1.72a5.006 5.006 0 0 0 6.95 7.07l1.71-1.71',
  hr:          'M5 12h14',
  undo:        'M3 7v6h6 M3 13C4.16 8.44 8.1 5 13 5a9 9 0 0 1 0 18 9 9 0 0 1-8.35-5.65',
  redo:        'M21 7v6h-6 M21 13a9 9 0 1 0-2.65 6.35',
  clear:       'M18 6L6 18M6 6l12 12',
}

// ── Toolbar presets ───────────────────────────────────────────────────────────
const PRESETS = {
  minimal: ['textStyle', '|', 'bold', 'italic', '|', 'ul', 'ol', '|', 'undo', 'redo'],
  basic:   ['textStyle', '|', 'bold', 'italic', 'underline', '|', 'ul', 'ol', 'blockquote', '|', 'link', '|', 'undo', 'redo'],
  full: [
    'textStyle', '|',
    'bold', 'italic', 'underline', 'strike', '|',
    'ul', 'ol', 'blockquote', 'code', '|',
    'alignLeft', 'alignCenter', 'alignRight', '|',
    'link', 'hr', '|',
    'undo', 'redo', 'clear',
  ],
}

// ── Text style options: paragraph + H1–H4 + text sizes ───────────────────────
const TEXT_STYLE_OPTIONS = [
  { label: 'Paragraph',   type: 'paragraph', preview: 'text-sm font-normal text-gray-700' },
  { label: 'Heading 1',   type: 'heading',   level: 1, preview: 'text-2xl font-bold text-gray-900' },
  { label: 'Heading 2',   type: 'heading',   level: 2, preview: 'text-xl font-bold text-gray-900' },
  { label: 'Heading 3',   type: 'heading',   level: 3, preview: 'text-lg font-bold text-gray-900' },
  { label: 'Heading 4',   type: 'heading',   level: 4, preview: 'text-base font-bold text-gray-900' },
  { label: 'Small',       type: 'paragraph', size: '12px', preview: 'text-xs text-gray-600' },
  { label: 'Large',       type: 'paragraph', size: '18px', preview: 'text-lg text-gray-700' },
  { label: 'Extra Large', type: 'paragraph', size: '22px', preview: 'text-xl text-gray-700' },
]

// ── Text Style Dropdown ───────────────────────────────────────────────────────
const TextStyleDropdown = ({ editor, editorState }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Derive current label from editorState (reactive)
  const currentLabel = (() => {
    if (!editorState) return 'Paragraph'
    if (editorState.isH1) return 'Heading 1'
    if (editorState.isH2) return 'Heading 2'
    if (editorState.isH3) return 'Heading 3'
    if (editorState.isH4) return 'Heading 4'
    return 'Paragraph'
  })()

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const apply = (opt) => {
    setOpen(false)
    if (!editor) return
    if (opt.type === 'heading') {
      editor.chain().focus().toggleHeading({ level: opt.level }).run()
    } else {
      editor.chain().focus().setParagraph().run()
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={[
          'flex items-center gap-1.5 h-7 px-2 rounded-md text-xs font-medium transition-colors duration-100 shrink-0 min-w-[100px]',
          open
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        ].join(' ')}
      >
        <span className="flex-1 text-left">{currentLabel}</span>
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-xl">
          {TEXT_STYLE_OPTIONS.map((opt) => {
            const isActive =
              opt.type === 'heading'
                ? editorState?.[`isH${opt.level}`]
                : (!editorState?.isH1 && !editorState?.isH2 && !editorState?.isH3 && !editorState?.isH4 && opt.label === 'Paragraph')

            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => apply(opt)}
                className={[
                  'w-full text-left px-3 py-1.5 transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'hover:bg-gray-50 text-gray-800',
                  opt.preview,
                ].join(' ')}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Link modal ────────────────────────────────────────────────────────────────
const LinkModal = ({ onConfirm, onCancel, initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl)
  return (
    <div className="absolute top-full left-2 z-50 mt-1 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <input
        autoFocus type="url" placeholder="https://example.com"
        value={url} onChange={e => setUrl(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onConfirm(url); if (e.key === 'Escape') onCancel() }}
        className="h-8 w-56 rounded-md border border-gray-300 px-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      <button onClick={() => onConfirm(url)} className="h-8 rounded-md bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Apply</button>
      <button onClick={onCancel} className="h-8 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
    </div>
  )
}

// ── Toolbar button ────────────────────────────────────────────────────────────
const ToolbarButton = ({ label, iconKey, active, disabled, onClick }) => (
  <button
    type="button" title={label} disabled={disabled} onClick={onClick}
    className={[
      'flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-100 shrink-0',
      active   ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
      disabled ? 'opacity-30 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    ].join(' ')}
  >
    <Icon d={ICONS[iconKey]} />
  </button>
)

// ── Main Toolbar ──────────────────────────────────────────────────────────────
const Toolbar = ({ editor, config = 'full' }) => {
  const [showLinkModal, setShowLinkModal] = useState(false)

  // ✅ THE FIX: useEditorState subscribes to editor state changes reactively.
  // Without this, toolbar buttons read stale isActive() values and never re-render.
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const e = ctx.editor
      if (!e) return {}
      return {
        // Marks
        isBold:      e.isActive('bold'),
        isItalic:    e.isActive('italic'),
        isUnderline: e.isActive('underline'),
        isStrike:    e.isActive('strike'),
        isCode:      e.isActive('code'),
        isLink:      e.isActive('link'),
        // Headings
        isH1:        e.isActive('heading', { level: 1 }),
        isH2:        e.isActive('heading', { level: 2 }),
        isH3:        e.isActive('heading', { level: 3 }),
        isH4:        e.isActive('heading', { level: 4 }),
        // Lists
        isBulletList:  e.isActive('bulletList'),
        isOrderedList: e.isActive('orderedList'),
        isBlockquote:  e.isActive('blockquote'),
        // Alignment
        isAlignLeft:   e.isActive({ textAlign: 'left' }),
        isAlignCenter: e.isActive({ textAlign: 'center' }),
        isAlignRight:  e.isActive({ textAlign: 'right' }),
        // History
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
      }
    },
  })

  const items = Array.isArray(config) ? config : (PRESETS[config] || PRESETS.full)

  const handleLink = useCallback(() => {
    if (!editor) return
    if (editor.isActive('link')) editor.chain().focus().unsetLink().run()
    else setShowLinkModal(true)
  }, [editor])

  const applyLink = useCallback((url) => {
    setShowLinkModal(false)
    if (!url) return
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor || !editorState) return null

  // Build action map using editorState (not editor.isActive() directly)
  const actions = {
    bold:        { label: 'Bold',          iconKey: 'bold',        active: editorState.isBold,        onClick: () => editor.chain().focus().toggleBold().run() },
    italic:      { label: 'Italic',        iconKey: 'italic',      active: editorState.isItalic,      onClick: () => editor.chain().focus().toggleItalic().run() },
    underline:   { label: 'Underline',     iconKey: 'underline',   active: editorState.isUnderline,   onClick: () => editor.chain().focus().toggleUnderline().run() },
    strike:      { label: 'Strikethrough', iconKey: 'strike',      active: editorState.isStrike,      onClick: () => editor.chain().focus().toggleStrike().run() },
    ul:          { label: 'Bullet List',   iconKey: 'ul',          active: editorState.isBulletList,  onClick: () => editor.chain().focus().toggleBulletList().run() },
    ol:          { label: 'Ordered List',  iconKey: 'ol',          active: editorState.isOrderedList, onClick: () => editor.chain().focus().toggleOrderedList().run() },
    blockquote:  { label: 'Blockquote',    iconKey: 'blockquote',  active: editorState.isBlockquote,  onClick: () => editor.chain().focus().toggleBlockquote().run() },
    code:        { label: 'Inline Code',   iconKey: 'code',        active: editorState.isCode,        onClick: () => editor.chain().focus().toggleCode().run() },
    alignLeft:   { label: 'Align Left',    iconKey: 'alignLeft',   active: editorState.isAlignLeft,   onClick: () => editor.chain().focus().setTextAlign('left').run() },
    alignCenter: { label: 'Align Center',  iconKey: 'alignCenter', active: editorState.isAlignCenter, onClick: () => editor.chain().focus().setTextAlign('center').run() },
    alignRight:  { label: 'Align Right',   iconKey: 'alignRight',  active: editorState.isAlignRight,  onClick: () => editor.chain().focus().setTextAlign('right').run() },
    link:        { label: editorState.isLink ? 'Remove Link' : 'Add Link', iconKey: editorState.isLink ? 'unlink' : 'link', active: editorState.isLink, onClick: handleLink },
    hr:          { label: 'Divider',       iconKey: 'hr',          active: false,                     onClick: () => editor.chain().focus().setHorizontalRule().run() },
    undo:        { label: 'Undo',          iconKey: 'undo',        active: false, disabled: !editorState.canUndo, onClick: () => editor.chain().focus().undo().run() },
    redo:        { label: 'Redo',          iconKey: 'redo',        active: false, disabled: !editorState.canRedo, onClick: () => editor.chain().focus().redo().run() },
    clear:       { label: 'Clear Format',  iconKey: 'clear',       active: false,                     onClick: () => editor.chain().focus().clearNodes().unsetAllMarks().run() },
  }

  return (
    <div className="relative flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
      {items.map((key, i) => {
        if (key === '|') return <span key={`sep-${i}`} className="mx-1 h-5 w-px bg-gray-300 shrink-0" />
        if (key === 'textStyle') return <TextStyleDropdown key="textStyle" editor={editor} editorState={editorState} />
        const item = actions[key]
        if (!item) return null
        return (
          <ToolbarButton
            key={key}
            label={item.label}
            iconKey={item.iconKey}
            active={item.active}
            disabled={item.disabled}
            onClick={item.onClick}
          />
        )
      })}

      {showLinkModal && (
        <LinkModal
          initialUrl={editor.getAttributes('link').href}
          onConfirm={applyLink}
          onCancel={() => setShowLinkModal(false)}
        />
      )}
    </div>
  )
}

export default Toolbar