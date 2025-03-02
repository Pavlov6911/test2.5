import { useState } from 'react';
import { Send } from 'lucide-react';
import { generateAIResponse } from '../lib/ai';

export default function AIChatPage() {
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Hello! I'm RMHub AI, powered by Gemini 2.0. How can I help you with FiveM mods today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userInput);
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I apologize, but I encountered an error. Please try again.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Chat with RMHub AI</h1>
      
      <div className="bg-background border border-border rounded-lg shadow-lg">
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-accent'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-accent max-w-[70%] rounded-lg p-3">
                Thinking...
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="border-t border-border p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about FiveM mods..."
              className="flex-1 p-2 rounded border"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`bg-primary text-primary-foreground px-4 py-2 rounded 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
              disabled={isLoading}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
