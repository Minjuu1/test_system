import { useState } from 'react';
import { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { sendChatMessage } from '@/lib/utils';

interface TestChatProps {
  systemPrompt: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function TestChat({ systemPrompt, messages, setMessages }: TestChatProps) {
  const [testMessage, setTestMessage] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2">Test Chat</h2>
      <div className="flex-grow overflow-y-auto mb-4 space-y-3">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            type="test" 
          />
        ))}
      </div>
      <ChatInput
        value={testMessage}
        onChange={setTestMessage}
        onSend={() => sendChatMessage(
          testMessage,
          'test',
          messages,
          setMessages,
          setTestMessage,
          systemPrompt
        )}
        placeholder="만든 챗봇을 테스트해보세요."
      />
    </div>
  );
}