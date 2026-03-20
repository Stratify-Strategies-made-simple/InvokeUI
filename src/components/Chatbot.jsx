import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm the automated assistant.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I'm a demo bot! Ask me about features.", sender: "bot" }]);
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
              <div key={index} className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none shadow-sm'}`}>{msg.text}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm" />
            <button onClick={handleSendMessage} className="bg-indigo-600 text-white p-2 rounded-full"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="p-3.5 bg-gray-900 text-white rounded-full shadow-lg"><MessageCircle className="w-6 h-6" /></button>
    </div>
  );
};