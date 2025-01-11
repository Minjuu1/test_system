import { useState } from 'react';
import { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { sendChatMessage } from '@/lib/utils';

export function HelperChat() {
  const [helperMessage, setHelperMessage] = useState('');
  const [helperChat, setHelperChat] = useState<Message[]>([]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
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
        placeholder="Ask for help with your prompt..."
      />
    </div>
  );
}