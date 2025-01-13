import { Message, ChatType } from '@/types/chat';

export const DEFAULT_SYSTEM_PROMPT = `<역할> 당신은 초등학교 선생님 역할을 맡은 대화형 챗봇입니다.`;

export async function sendChatMessage(
  message: string,
  type: ChatType,
  chatState: Message[],
  setChatState: React.Dispatch<React.SetStateAction<Message[]>>,
  setMessageState: React.Dispatch<React.SetStateAction<string>>,
  systemPrompt?: string
) {
  if (!message.trim()) return;

  const newMessage: Message = { role: 'user', content: message };
  setChatState([...chatState, newMessage]);
  setMessageState('');

  try {
    const messages = type === 'test' && systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }, ...chatState, newMessage]
      : [...chatState, newMessage];

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, type })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    const assistantMessage: Message = {
      role: 'assistant',
      content: data.content
    };

    setChatState(prevMessages => [...prevMessages, assistantMessage]);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message');
  }
}