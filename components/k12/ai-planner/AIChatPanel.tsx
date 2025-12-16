'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, Message } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface DistrictProfile {
  id?: string;
  schoolName: string;
  state: string;
  gradeLevels: string[];
  currentOfferings?: string;
  pathways?: string[];
  resources?: string;
}

interface AIChatPanelProps {
  districtProfile?: DistrictProfile;
  conversationId?: string;
  locale?: string;
  onConversationCreated?: (id: string) => void;
}

interface StreamEvent {
  type: 'content' | 'sources' | 'error' | 'done';
  content?: string;
  sources?: Array<{
    type: string;
    title: string;
    snippet?: string;
  }>;
  error?: string;
}

const SUGGESTED_PROMPTS = [
  {
    label: 'K-12 Scope & Sequence',
    prompt: 'Create a complete K-12 scope and sequence for CS education aligned with our state standards.',
  },
  {
    label: 'Curriculum Recommendations',
    prompt: 'What free CS curricula would you recommend for our grade levels and pathways?',
  },
  {
    label: 'CSTA Standards Alignment',
    prompt: 'How can we align our CS program with CSTA standards across all grade bands?',
  },
  {
    label: 'Implementation Roadmap',
    prompt: 'Help us create a phased implementation plan for launching CS education in our district.',
  },
];

export function AIChatPanel({
  districtProfile,
  conversationId: initialConversationId,
  locale = 'en',
  onConversationCreated,
}: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(
    initialConversationId
  );
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load existing conversation if ID provided
  useEffect(() => {
    if (initialConversationId) {
      loadConversation(initialConversationId);
    }
  }, [initialConversationId]);

  const loadConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(
          data.messages.map((m: { id: string; role: string; content: string; metadata?: { sources?: unknown }; created_at: string }) => ({
            id: m.id,
            role: m.role as 'user' | 'assistant' | 'system',
            content: m.content,
            sources: m.metadata?.sources,
            createdAt: new Date(m.created_at),
          }))
        );
      }
    } catch (err) {
      console.error('Failed to load conversation:', err);
    }
  };

  const handleSend = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setError(null);
      setIsLoading(true);

      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Add placeholder for assistant response
      const assistantId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      try {
        // Create or get conversation ID
        let activeConversationId = conversationId;
        if (!activeConversationId) {
          // Create new conversation
          const createResponse = await fetch('/api/conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              districtId: districtProfile?.id,
              locale,
            }),
          });
          if (createResponse.ok) {
            const data = await createResponse.json();
            activeConversationId = data.id;
            setConversationId(data.id);
            onConversationCreated?.(data.id);
          }
        }

        // Save user message to conversation
        if (activeConversationId) {
          fetch(`/api/conversations/${activeConversationId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              role: 'user',
              content: content.trim(),
            }),
          }).catch(console.error);
        }

        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content.trim(),
            conversationId: activeConversationId,
            districtProfile,
            locale,
            messages: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let buffer = '';
        let fullContent = '';
        let sources: StreamEvent['sources'] = undefined;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              if (jsonStr === '[DONE]') continue;

              try {
                const event: StreamEvent = JSON.parse(jsonStr);

                if (event.type === 'content' && event.content) {
                  fullContent += event.content;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: m.content + event.content }
                        : m
                    )
                  );
                } else if (event.type === 'sources' && event.sources) {
                  sources = event.sources;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, sources: event.sources }
                        : m
                    )
                  );
                } else if (event.type === 'error') {
                  setError(event.error || 'An error occurred');
                }
              } catch {
                // Ignore parse errors for incomplete JSON
              }
            }
          }
        }

        // Save assistant message to conversation when complete
        if (activeConversationId && fullContent) {
          fetch(`/api/conversations/${activeConversationId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              role: 'assistant',
              content: fullContent,
              metadata: sources ? { sources } : undefined,
            }),
          }).catch(console.error);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Request was cancelled
          return;
        }

        console.error('Chat error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');

        // Remove the empty assistant message on error
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [conversationId, districtProfile, locale, messages, onConversationCreated]
  );

  const handleClearConversation = () => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  };

  // Get contextual suggested prompts based on district profile
  const getSuggestedPrompts = () => {
    if (messages.length > 0) {
      return []; // Hide suggested prompts after first message
    }
    return SUGGESTED_PROMPTS;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Planning Assistant
          </h2>
          {districtProfile && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {districtProfile.schoolName} • {districtProfile.state}
            </p>
          )}
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClearConversation}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Clear chat
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Welcome to the AI Planning Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              I can help you create a comprehensive K-12 CS education plan
              tailored to your district. Ask me about curriculum recommendations,
              scope and sequence, or standards alignment.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isStreaming={
                  isLoading &&
                  message.role === 'assistant' &&
                  message.id === messages[messages.length - 1]?.id
                }
              />
            ))}
          </>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
        suggestedPrompts={getSuggestedPrompts()}
        placeholder={
          districtProfile
            ? `Ask about CS curriculum for ${districtProfile.schoolName}...`
            : 'Ask about K-12 CS curriculum planning...'
        }
      />
    </div>
  );
}
