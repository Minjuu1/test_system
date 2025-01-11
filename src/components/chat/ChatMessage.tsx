import { Message, ChatType } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  type: ChatType;
}

export function ChatMessage({ message, type }: ChatMessageProps) {
  const bgColor = message.role === 'assistant' 
    ? type === 'helper' ? 'bg-blue-50' : 'bg-green-50'
    : 'bg-gray-50';

  return (
    <div className={`p-3 rounded-lg ${bgColor}`}>
      {message.content}
    </div>
  );
}