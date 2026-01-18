import {useState} from 'react';
import {useAuth} from '../context/AuthContext';

interface Props {
  onPost: (content: string) => void;
  onAuthRequired: () => void;
}

export default function PostEditor({onPost, onAuthRequired}: Props) {
  const [content, setContent]=useState('');
  const {user}=useAuth();

  function handleSubmit() {
    if(!user) {
      onAuthRequired();
      return;
    }
    if(content.trim()) {
      onPost(content);
      setContent('');
    }
  }

  function handleFocus() {
    if(!user) {
      onAuthRequired();
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-100">
        <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded flex items-center gap-2">
          Paragraph
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded font-bold">B</button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded italic">I</button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded underline">U</button>

        <div className="w-px h-6 bg-gray-200 mx-2" />
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M10 6h11M10 12h11M10 18h11" />
            <text x="2" y="8" fontSize="8" fill="currentColor">1</text>
            <text x="2" y="14" fontSize="8" fill="currentColor">2</text>
            <text x="2" y="20" fontSize="8" fill="currentColor">3</text>
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-200 mx-2" />
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded text-lg font-serif">"</button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
          </svg>
        </button>

        <div className="flex-1" />
        <button className="p-2 text-red-400 hover:bg-red-50 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-start gap-3">
          <button className="text-gray-400 hover:text-gray-600 rounded h-6 flex items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleFocus}
            placeholder="How are you feeling today?"
            className="flex-1 text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none min-h-[80px] text-base leading-6"
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="6" width="14" height="12" rx="2" />
              <path d="M22 8l-6 4 6 4V8z" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="w-10 h-10 bg-primary hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
