interface SystemPromptEditorProps {
    value: string;
    onChange: (value: string) => void;
    onApply: () => void;
  }
  
  export function SystemPromptEditor({ 
    value, 
    onChange, 
    onApply 
  }: SystemPromptEditorProps) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-bold mb-3">System Prompt</h2>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-48 p-3 border rounded-lg mb-3"
        />
        <button
          onClick={onApply}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Apply Prompt
        </button>
      </div>
    );
  }