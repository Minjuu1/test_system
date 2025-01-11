'use client';

import { useState } from 'react';
import { Message } from '@/types/chat';
import { SystemPromptEditor } from '@/components/SYSTEM_PROMPT';
import { HelperChat } from '@/components/chat/HelperChat';
import { TestChat } from '@/components/chat/TestChat';
import { DEFAULT_SYSTEM_PROMPT } from '@/lib/utils';

const DEFAULT_INITIAL_MESSAGE = "Hello! How can I assist you today?";

export default function Home() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [initialMessage, setInitialMessage] = useState(DEFAULT_INITIAL_MESSAGE);
  const [testChat, setTestChat] = useState<Message[]>([
    { role: 'assistant', content: DEFAULT_INITIAL_MESSAGE }
  ]);

  const handleApplyChanges = () => {
    // Reset chat with new initial message
    setTestChat([
      { role: 'assistant', content: initialMessage }
    ]);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <SystemPromptEditor
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            onSystemPromptChange={setSystemPrompt}
            onInitialMessageChange={setInitialMessage}
            onApply={handleApplyChanges}
          />
          <HelperChat />
        </div>

        {/* Right Column */}
        <TestChat
          systemPrompt={systemPrompt}
          messages={testChat}
          setMessages={setTestChat}
        />
      </div>
    </main>
  );
}