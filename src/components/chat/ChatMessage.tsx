import { Message, ChatType } from '@/types/chat';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  type: ChatType;
}

export function ChatMessage({ message, type }: ChatMessageProps) {
  const bgColor = message.role === 'assistant' 
    ? type === 'helper' ? 'bg-blue-50' : 'bg-green-50'
    : 'bg-gray-50';

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${bgColor}`}>
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
        {message.role === 'assistant' ? (
          <Bot size={20} className="text-blue-500" />
        ) : (
          <User size={20} className="text-gray-500" />
        )}
      </div>
      <div className="flex-1 break-words">
        {message.content}
      </div>
    </div>
  );
}