// components/jobs/ChatWidget.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  context?: {
    type: 'job' | 'profile' | 'list' | 'dashboard';
    jobId?: string;
    company?: string;
  };
}

export default function ChatWidget({ context }: ChatWidgetProps) {
  const { sessionToken } = useJobsAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !sessionToken || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // Build context-aware prompt
      let contextPrompt = '';
      if (context?.type === 'job' && context.company) {
        contextPrompt = `Context: User is viewing a job at ${context.company}. `;
      } else if (context?.type === 'profile') {
        contextPrompt = 'Context: User is on their profile page. ';
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_CONDUCTOR_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          message: contextPrompt + userMessage,
          featureContext: 'jobs',
          selectedDocIds: context?.jobId ? [context.jobId] : undefined,
        }),
      });

      const data = await response.json();

      if (data.answer) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I couldn\'t process that request. Please try again.'
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Network error. Please check your connection and try again.'
      }]);
    }

    setLoading(false);
  }

  if (!sessionToken) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#00a8ff] text-white shadow-lg hover:bg-[#0090dd] transition-all z-50 flex items-center justify-center"
        style={{ boxShadow: '0 4px 20px rgba(0, 168, 255, 0.4)' }}
      >
        {isOpen ? (
          <span className="text-2xl">&times;</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-[380px] h-[500px] rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
          style={{ background: '#1C1C1E' }}
        >
          {/* Header */}
          <div className="p-4 border-b border-[#38383A]">
            <h3 className="font-semibold text-white">Job Search Assistant</h3>
            <p className="text-xs text-[#636366]">
              {context?.company
                ? `Viewing ${context.company}`
                : 'Ask about jobs, interviews, or career advice'}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-[#636366] py-8">
                <p className="text-sm">Ask me anything about:</p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>Your saved jobs</li>
                  <li>Interview preparation</li>
                  <li>Resume tailoring</li>
                  <li>Company research</li>
                </ul>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#00a8ff] text-white'
                      : 'bg-[#38383A] text-[#D1D1D6]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#38383A] text-[#636366] p-3 rounded-lg text-sm">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#38383A]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 rounded-lg text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={{ background: 'rgba(56, 56, 58, 0.5)' }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2 rounded-lg bg-[#00a8ff] text-white disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
