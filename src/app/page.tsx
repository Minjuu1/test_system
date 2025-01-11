'use client';

import { useState } from 'react';
import { Message } from '@/types/chat';
import { SystemPromptEditor } from '@/components/systemPromptEditor';
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
    <main className="container mx-auto p-4 h-screen">
      <div className="grid grid-cols-2 gap-6 h-[calc(100vh-2rem)]">
        {/* Left Column */}
        <div className="flex flex-col space-y-6 h-full">
          {/* SystemPromptEditor*/}
          <div className="h-2/3">
            <SystemPromptEditor
              systemPrompt={systemPrompt}
              initialMessage={initialMessage}
              onSystemPromptChange={setSystemPrompt}
              onInitialMessageChange={setInitialMessage}
              onApply={handleApplyChanges}
            />
          </div>

          <div className="h-1/3">
            <HelperChat />
          </div>
        </div>

        {/* Right Column */}
        <div className="h-full">
          <TestChat
            systemPrompt={systemPrompt}
            messages={testChat}
            setMessages={setTestChat}
          />
        </div>
      </div>
    </main>
  );
}