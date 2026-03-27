import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm the automated assistant. Ask me about our AI tools!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // The Brain (Simple Logic)
  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("hello") || lowerText.includes("hi")) return "Hello! How can I help you today?";
    else if (lowerText.includes("price") || lowerText.includes("cost")) return "Our basic AI extension is free! The pro version is $10/month.";
    else if (lowerText.includes("feature")) return "I can summarize websites, generate text, and answer questions!";
    else if (lowerText.includes("contact")) return "You can reach our support team at support@example.com.";
    else return "I'm not sure about that. Try asking about 'price', 'features', or 'contact'.";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    
    setTimeout(() => {
      const botReply = getBotResponse(userMessage);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 h-96 flex flex-col animate-scale-in mb-2 overflow-hidden">
          <div className="bg-gray-900 text-white p-4 font-bold flex items-center justify-between">
             <span>Invoke Assist</span>
             <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div key={index} className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none shadow-sm'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input 
              type="text" value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
              placeholder="Type 'price', 'features'..." 
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
            <button onClick={handleSendMessage} className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
               <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="p-3.5 bg-gray-900 hover:bg-black text-white rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center w-14 h-14">
         {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};