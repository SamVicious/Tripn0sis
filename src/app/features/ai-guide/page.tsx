"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIGuidePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "G'day mate! I'm your AI Sydney guide with a fair dinkum Aussie accent. Ask me anything about Sydney - from the best meat pies in Newtown to secret swimming spots only locals know about!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry mate, I'm having a bit of trouble right now. Try asking me something else!",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Crikey! Something went wrong on my end. Give it another burl in a tick!",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's the best way to get around Sydney?",
    "Where can I find the best coffee in Sydney?",
    "What are some hidden gems tourists don't know about?",
    "How do I use the Opal card system?",
    "What's the weather like today?",
    "Tell me about Aboriginal culture in Sydney"
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-white hover:text-purple-100 mr-4">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">AI Sydney Guide</h1>
            </div>
            <div className="text-purple-100 text-sm">
              🤖 Your Local AI Mate
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 rounded-t-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Sydney AI Guide</h3>
                <p className="text-purple-100 text-sm">Your friendly local AI assistant</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Sydney..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions to Get Started:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputText(question)}
                className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
              >
                <span className="text-purple-600 mr-2">💬</span>
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">🧠</span>
            What I Can Help You With
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start">
              <span className="text-purple-500 text-xl mr-3">🗺️</span>
              <div>
                <h4 className="font-semibold">Local Navigation</h4>
                <p className="text-gray-600 text-sm">Best routes, transport tips, and shortcuts only locals know.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 text-xl mr-3">🍽️</span>
              <div>
                <h4 className="font-semibold">Food & Drink</h4>
                <p className="text-gray-600 text-sm">Hidden cafes, best pubs, and where to get authentic Aussie tucker.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 text-xl mr-3">🏛️</span>
              <div>
                <h4 className="font-semibold">Culture & History</h4>
                <p className="text-gray-600 text-sm">Stories behind landmarks and Aboriginal cultural significance.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 text-xl mr-3">🌊</span>
              <div>
                <h4 className="font-semibold">Beach Life</h4>
                <p className="text-gray-600 text-sm">Best beaches, surf conditions, and coastal walks.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 text-xl mr-3">🎭</span>
              <div>
                <h4 className="font-semibold">Events & Nightlife</h4>
                <p className="text-gray-600 text-sm">What's on tonight, live music venues, and local events.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 text-xl mr-3">💰</span>
              <div>
                <h4 className="font-semibold">Budget Tips</h4>
                <p className="text-gray-600 text-sm">Free activities, happy hour spots, and money-saving hacks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
