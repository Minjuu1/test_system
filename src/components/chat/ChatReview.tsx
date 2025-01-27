import { useState } from 'react';
import { Message } from '@/types/chat';

interface ChatReviewProps {
    messages: Message[];
}

interface Review {
    messages: { role: string; content: string }[];
    label: string;
    comment: string;
  }

export function ChatReview({ messages }: ChatReviewProps) {
    const [label, setLabel] = useState('');
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState<Review[]>([]);
  
    const handleSave = () => {
      if (messages.length > 0 && label && comment) {
        const newReview = {
          messages: messages.map(message => ({ role: message.role, content: message.content })),
          label,
          comment
        };
        setReviews([...reviews, newReview]);
        setLabel('');
        setComment('');
      }
    };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2">Chat Review</h2>
      <div className="flex-grow mb-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <p key={index}><strong>{message.role === 'user' ? 'user' : 'chatbot'}:</strong> {message.content}</p>
          ))
        ) : (
          <p>코멘트를 남길 메시지를 선택하세요.</p>
        )}
      </div>
      <div className="mb-4">
      <label className="block mb-2">Label</label>
        <div className="flex space-x-2">
          <button
            className={`p-2 border rounded-lg ${label === '만족' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setLabel('만족')}
          >
            만족
          </button>
          <button
            className={`p-2 border rounded-lg ${label === '개선 필요' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setLabel('개선 필요')}
          >
            개선 필요
          </button>
          <button
            className={`p-2 border rounded-lg ${label === '오류' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setLabel('오류')}
          >
            오류
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="구체적인 이유를 작성하세요."
        />
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-lg mb-4">Save</button>
      <div className="flex-grow overflow-y-auto">
        {reviews.map((review, index) => (
          <div key={index} className="p-2 border rounded-lg mb-2">
            <p><strong>Messages:</strong></p>
            <ul className="ml-3">
            {review.messages.map((msg, idx) => (
                <li key={idx}>- <em>{msg.role === 'user' ? 'user' : 'chatbot'}</em>: {msg.content}</li>
              ))}
            </ul>
            <p><strong>Label:</strong> {review.label}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}