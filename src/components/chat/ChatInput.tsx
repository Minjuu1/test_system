interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    placeholder: string;
  }
  
  export function ChatInput({ value, onChange, onSend, placeholder }: ChatInputProps) {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
        />
        <button 
          onClick={onSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    );
  }