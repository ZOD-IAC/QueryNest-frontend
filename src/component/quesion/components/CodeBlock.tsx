// ============================================
// FILE: components/question/CodeBlock.tsx

import { Check, Code, Copy } from 'lucide-react';
import { useState } from 'react';
// ============================================
interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='bg-slate-900 rounded-lg overflow-hidden my-4'>
      <div className='flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700'>
        <div className='flex items-center gap-2'>
          <Code className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-300'>{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className='flex items-center gap-2 px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm transition-colors'
        >
          {copied ? (
            <>
              <Check className='w-4 h-4' />
              Copied!
            </>
          ) : (
            <>
              <Copy className='w-4 h-4' />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className='p-4 overflow-x-auto'>
        <code className='text-sm text-slate-100 font-mono'>{code}</code>
      </pre>
    </div>
  );
};
