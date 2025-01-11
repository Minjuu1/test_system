'use client';

import { useState } from 'react';
import { Message } from '@/types/chat';
import { SystemPromptEditor } from '@/components/SYSTEM_PROMPT';
import { HelperChat } from '@/components/chat/HelperChat';
import { TestChat } from '@/components/chat/TestChat';
import { DEFAULT_SYSTEM_PROMPT } from '@/lib/utils';

export default function Home() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [testChat, setTestChat] = useState<Message[]>([]);

  const handleApplyPrompt = () => {
    setTestChat([]);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <SystemPromptEditor
            value={systemPrompt}
            onChange={setSystemPrompt}
            onApply={handleApplyPrompt}
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