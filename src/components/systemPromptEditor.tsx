interface SystemPromptEditorProps {
    systemPrompt: string;
    initialMessage: string;
    onSystemPromptChange: (value: string) => void;
    onInitialMessageChange: (value: string) => void;
    onApply: () => void;
  }
  
export function SystemPromptEditor({ 
    systemPrompt,
    initialMessage,
    onSystemPromptChange,
    onInitialMessageChange,
    onApply 
  }: SystemPromptEditorProps) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
        {/* System Prompt Section */}
        <div className="flex-grow mb-4">
          <h2 className="text-xl font-bold mb-2">System Prompt</h2>
          <textarea
            value={systemPrompt}
            onChange={(e) => onSystemPromptChange(e.target.value)}
            className="w-full h-[calc(100%-2rem)] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter system prompt..."
          />
        </div>
        
        {/* Initial Message Section */}
        <div className="h-1/3 mb-4">
          <h2 className="text-xl font-bold mb-2">Initial AI Message</h2>
          <textarea
            value={initialMessage}
            onChange={(e) => onInitialMessageChange(e.target.value)}
            className="w-full h-[calc(100%-2rem)] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the initial greeting message from AI..."
          />
        </div>
        
        {/* Apply Button */}
        <button
          onClick={onApply}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply Changes
        </button>
      </div>
    );
  }