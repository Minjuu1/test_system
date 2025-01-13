import { useState } from 'react';
import { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { sendChatMessage } from '@/lib/utils';

export function HelperChat() {
  const [helperMessage, setHelperMessage] = useState('');
  const [helperChat, setHelperChat] = useState<Message[]>([]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-3">Prompt Helper</h2>
      <div className="h-64 overflow-y-auto mb-4 space-y-3">
        {helperChat.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            type="helper" 
          />
        ))}
      </div>
      <ChatInput
        value={helperMessage}
        onChange={setHelperMessage}
        onSend={() => sendChatMessage(
          helperMessage,
          'helper',
          helperChat,
          setHelperChat,
          setHelperMessage
        )}
        placeholder="프롬프트 작성이 어렵다면 물어보세요!"
      />
    </div>
  );
}