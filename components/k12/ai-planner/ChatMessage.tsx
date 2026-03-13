'use client';

import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date;
  sources?: Array<{
    type: string;
    title: string;
    snippet?: string;
  }>;
}

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

function ChatMessageComponent({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  if (message.role === 'system') {
    return null;
  }

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
        }`}
      >
        {/* Message content */}
        <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'dark:prose-invert'}`}>
          {isAssistant ? (
            <ReactMarkdown
              components={{
                // Style links
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline ${isUser ? 'text-blue-200 hover:text-white' : 'text-blue-600 dark:text-blue-400 hover:underline'}`}
                  >
                    {children}
                  </a>
                ),
                // Style code blocks
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className}>
                      {children}
                    </code>
                  );
                },
                // Style lists
                ul: ({ children }) => (
                  <ul className="list-disc pl-4 my-2 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-4 my-2 space-y-1">
                    {children}
                  </ol>
                ),
                // Style paragraphs
                p: ({ children }) => (
                  <p className="my-2 first:mt-0 last:mb-0">
                    {children}
                  </p>
                ),
                // Style headings
                h1: ({ children }) => (
                  <h1 className="text-lg font-bold mt-4 mb-2 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-bold mt-3 mb-2 first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-bold mt-2 mb-1 first:mt-0">
                    {children}
                  </h3>
                ),
                // Style tables
                table: ({ children }) => (
                  <div className="overflow-x-auto my-2">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 bg-gray-50 dark:bg-gray-700 font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Streaming indicator */}
        {isStreaming && isAssistant && (
          <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
        )}

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Sources:
            </p>
            <div className="space-y-1">
              {message.sources.map((source, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded px-2 py-1"
                >
                  <span className="font-medium">{source.type}:</span> {source.title}
                  {source.snippet && (
                    <span className="block text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                      {source.snippet}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const ChatMessage = memo(ChatMessageComponent);
