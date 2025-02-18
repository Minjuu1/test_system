'use client';

import { useState } from 'react';
import { Message } from '@/types/chat';
import { SystemPromptEditor } from '@/components/systemPromptEditor';
import { HelperChat } from '@/components/chat/HelperChat';
import { TestChat } from '@/components/chat/TestChat';
import { DEFAULT_SYSTEM_PROMPT } from '@/lib/utils';
import { DEFAULT_INTERACTION_PROMPT } from '@/lib/utils';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ChatReview } from '@/components/chat/ChatReview';



const DEFAULT_INITIAL_MESSAGE = "안녕! 우리 같이 대화해보자!";

export default function Home() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [initialMessage, setInitialMessage] = useState(DEFAULT_INITIAL_MESSAGE);
  const [testChat, setTestChat] = useState<Message[]>([
    { role: 'assistant', content: DEFAULT_INITIAL_MESSAGE }
  ]);
  const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);

  const handleApplyChanges = () => {
    // Reset chat with new initial message
    setTestChat([
      { role: 'assistant', content: initialMessage }
    ]);
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessages(prev => {
      if (prev.includes(message)) {
        return prev.filter(m => m !== message);
      } else {
        return [...prev, message];
      }
    });
  };

  return (
    <main className="container mx-auto p-4 h-screen">
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-2rem)]">
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
        <div className="h-full">
          <TestChat
            systemPrompt={systemPrompt + DEFAULT_INTERACTION_PROMPT}
            messages={testChat}
            setMessages={setTestChat}
            onSelectMessage={handleSelectMessage}
          />
        </div>
        <div className="h-full">
          <ChatReview messages={selectedMessages} />
        </div>
      </div>
    </main>
  );
}