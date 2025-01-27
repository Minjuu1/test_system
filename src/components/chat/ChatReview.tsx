import { useState } from 'react';
import { Message } from '@/types/chat';

interface ChatReviewProps {
  message: Message | null;
}

interface Review {
    message: string;
    label: string;
    comment: string;
  }

export function ChatReview({ message }: ChatReviewProps) {
  const [label, setLabel] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2">Chat Review</h2>
      <div className="flex-grow mb-4">
        <p>{message ? message.content : '메시지를 선택하세요.'}</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Label</label>
        <select value={label} onChange={(e) => setLabel(e.target.value)} className="w-full p-2 border rounded-lg">
          <option value="">Select a label</option>
          <option value="good">좋음</option>
          <option value="needs_improvement">개선 필요</option>
          <option value="error">오류</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Reason</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="구체적인 이유를 작성하세요." />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
    </div>
  );
}