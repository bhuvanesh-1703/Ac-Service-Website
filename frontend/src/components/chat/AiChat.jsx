import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FaWhatsapp, 
  FaPaperPlane, 
  FaMicrophone, 
  FaEllipsisV, 
  FaCheckDouble, 
  FaSmile, 
  FaPaperclip, 
  FaTrashAlt,
  FaArrowLeft
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

// Default welcome message
const WELCOME_MESSAGE = {
  role: 'model',
  parts: [{ text: "Hello! Welcome to V&V Services support. 🛠️\n\nI can help you with AC installation, Refrigerator repair, Washing Machine servicing, and RO Water Purifier maintenance.\n\nHow can I assist you today?" }],
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
};

// Starter questions to help users instantly
const STARTER_QUESTIONS = [
  "❄️ Book an AC Service",
  "💰 Check Repair Price List",
  "⏰ What are your working hours?",
  "📞 Get customer helpline number"
];

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);

  // Initialize and load chat from local storage
  useEffect(() => {
    const savedChat = localStorage.getItem('vv_services_chat_history');
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat));
    } else {
      // Set default greeting and trigger unread notification badge
      setChatHistory([WELCOME_MESSAGE]);
      setHasUnread(true);
    }
  }, []);

  // Save chat history to localStorage
  const saveChatHistory = (history) => {
    setChatHistory(history);
    localStorage.setItem('vv_services_chat_history', JSON.stringify(history));
  };

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, loading, isOpen]);

  // Click outside listener for menu dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Open Chat Handler
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  // Send message API call
  const sendMessageToAi = async (textToSend) => {
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    // Create new history with user message
    const userMessage = {
      role: 'user',
      parts: [{ text: textToSend }],
      timestamp
    };
    
    const updatedHistory = [...chatHistory, userMessage];
    saveChatHistory(updatedHistory);
    setMessage('');
    setLoading(true);

    try {
      // Map history to format expected by GoogleGenAI SDK (only role and parts)
      const formattedHistory = updatedHistory.map(msg => ({
        role: msg.role,
        parts: msg.parts.map(part => ({ text: part.text }))
      }));

      const res = await axios.post('http://localhost:5100/api/ai/chat', {
        message: textToSend,
        history: formattedHistory
      });

      if (res.data && res.data.success) {
        const aiMessage = {
          role: 'model',
          parts: [{ text: res.data.response }],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        };
        saveChatHistory([...updatedHistory, aiMessage]);
      } else {
        throw new Error(res.data.error || 'Server error occurred');
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      const errorMessage = {
        role: 'model',
        parts: [{ text: "Sorry, I am facing trouble connecting to my brain right now. Please try again in a moment, or contact us directly at +91 63740 09568. 📞" }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        isError: true
      };
      saveChatHistory([...updatedHistory, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessageToAi(message);
  };

  const handleStarterQuestionClick = (question) => {
    // Strip emoji prefix from query before sending to AI
    const cleanedText = question.replace(/^[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]\s*/, '');
    sendMessageToAi(cleanedText);
  };

  const handleClearChat = () => {
    const resetHistory = [WELCOME_MESSAGE];
    saveChatHistory(resetHistory);
    setShowMenu(false);
  };

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <button
          onClick={isOpen ? () => setIsOpen(false) : handleOpenChat}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
          aria-label="Toggle WhatsApp Chat"
          id="btn-whatsapp-chat"
        >
          {isOpen ? (
            <IoClose className="w-7 h-7 transition-transform duration-200 rotate-0" />
          ) : (
            <FaWhatsapp className="w-8 h-8 transition-transform duration-200 hover:rotate-12" />
          )}

          {/* Pulse notification badge if unread and closed */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-[10px] text-white font-bold items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>
      </div>

      {/* 2. CHAT PANEL WIDGET */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 z-50 flex flex-col w-[360px] md:w-[400px] h-[580px] max-h-[calc(100vh-120px)] max-w-[calc(100vw-32px)] bg-[#efeae2] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-black/5"
            style={{
              backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
              backgroundBlendMode: 'overlay',
              backgroundColor: '#efeae2'
            }}
          >
            {/* A. HEADER SECTION */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#008069] text-white shadow-md relative z-10">
              <div className="flex items-center gap-3">
                {/* Back button on small screen, otherwise business avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/10 flex items-center justify-center font-bold text-lg text-white select-none">
                    V&V
                  </div>
                  {/* Active online indicator dot */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#008069]"></span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm tracking-wide">V&V Support</span>
                    {/* WhatsApp Verified Badge SVG */}
                    <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="text-[11px] text-white/85">Typically replies instantly</span>
                </div>
              </div>

              {/* Header actions */}
              <div className="flex items-center gap-3.5 relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer focus:outline-none"
                  aria-label="Chat Menu"
                >
                  <FaEllipsisV className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer focus:outline-none"
                  aria-label="Minimize Chat"
                >
                  <IoClose className="w-5 h-5 text-white" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-10 w-44 bg-white rounded-lg shadow-xl py-1 text-gray-800 text-sm z-50 border border-gray-100"
                    >
                      <button
                        onClick={handleClearChat}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-100 flex items-center gap-2.5 text-red-600 transition-colors"
                      >
                        <FaTrashAlt className="w-3.5 h-3.5" />
                        Clear Chat History
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* B. CHAT CONTAINER / MESSAGES LIST */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 flex flex-col scrollbar-thin">
              {/* WhatsApp System Encrypted Text Notice */}
              <div className="self-center bg-[#ffe596]/80 text-[#303030] text-[11px] px-3 py-1.5 rounded-lg text-center max-w-[85%] shadow-sm leading-relaxed select-none mb-1.5 border border-yellow-200/20">
                🔒 Messages are AI-assisted and securely processed. Your chat history is saved locally.
              </div>

              {/* Message bubbles list */}
              {chatHistory.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[82%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    {/* Chat Bubble */}
                    <div
                      className={`relative px-3.5 py-2 shadow-md ${
                        isUser 
                          ? 'bg-[#d9fdd3] text-gray-900 rounded-2xl rounded-tr-none' 
                          : msg.isError 
                            ? 'bg-red-50 text-red-900 border border-red-200 rounded-2xl rounded-tl-none'
                            : 'bg-white text-gray-900 rounded-2xl rounded-tl-none'
                      }`}
                    >
                      {/* Tail styling */}
                      <span
                        className={`absolute top-0 w-3 h-3 ${
                          isUser 
                            ? 'right-[-6px] text-[#d9fdd3] fill-current border-t-[8px] border-t-current border-r-[8px] border-r-transparent' 
                            : msg.isError
                              ? 'left-[-6px] text-red-50 fill-current border-t-[8px] border-t-current border-l-[8px] border-l-transparent'
                              : 'left-[-6px] text-white fill-current border-t-[8px] border-t-current border-l-[8px] border-l-transparent'
                        }`}
                      />
                      
                      {/* Message content text */}
                      <p className="text-[13.5px] leading-relaxed whitespace-pre-line select-text">
                        {msg.parts[0].text}
                      </p>

                      {/* Bubble footer with timestamp / double blue checkmark */}
                      <div className="flex items-center justify-end gap-1.5 mt-1.5 select-none">
                        <span className="text-[9.5px] text-gray-500/80">
                          {msg.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </span>
                        {isUser && (
                          <FaCheckDouble className="w-3.5 h-3.5 text-[#53bdeb]" title="Read" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bouncing Dots Loading/Typing Indicator */}
              {loading && (
                <div className="self-start flex flex-col items-start max-w-[80%]">
                  <div className="relative px-4 py-3 bg-white shadow-md rounded-2xl rounded-tl-none">
                    {/* Tail styling */}
                    <span className="absolute top-0 left-[-6px] text-white fill-current border-t-[8px] border-t-current border-l-[8px] border-l-transparent" />
                    
                    <div className="flex items-center gap-1.5 py-1 px-0.5">
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* C. QUICK / STARTER QUESTIONS PANEL (ONLY IF LAST MESSAGE IS AI AND CHAT NOT CURRENTLY LOADING) */}
            {/* {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === 'model' && !loading && (
              <div className="px-4 py-2 space-y-1.5 bg-black/5 border-t border-black/5 relative z-10">
                <p className="text-[11px] text-gray-600 font-semibold mb-1 uppercase tracking-wider select-none">Quick Queries</p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1">
                  {STARTER_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStarterQuestionClick(question)}
                      className="bg-white hover:bg-[#d9fdd3] active:bg-[#c2fad0] text-gray-800 hover:text-green-800 text-[12px] font-medium px-2.5 py-1.5 rounded-full border border-gray-200/80 shadow-sm transition-all cursor-pointer select-none text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            {/* D. FOOTER INPUT PANEL */}
            <form
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f2f5] border-t border-gray-200 relative z-10"
            >
              {/* Left Utilities */}
            

              {/* Text Area Input */}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
                className="flex-1 bg-white text-gray-800 text-sm px-3.5 py-2 rounded-full border-none outline-none focus:ring-1 focus:ring-[#008069]/40 shadow-inner"
              />

              {/* Send  button */}
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className={`flex items-center justify-center w-9.5 h-9.5 rounded-full shadow-md text-white transition-all focus:outline-none cursor-pointer ${
                  message.trim() 
                    ? 'bg-[#008069] hover:bg-[#005a49] active:scale-95' 
                    : 'bg-gray-400/90 cursor-default'
                }`}
                aria-label="Send Message"
              >
                {message.trim() ? (
                  <FaPaperPlane className="w-3.5 h-3.5 translate-x-[1px]" />
                ) : (
                  <FaPaperPlane className="w-4.5 h-4.5"  /> 
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChat;