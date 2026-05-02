import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChatbubbleEllipses, IoClose, IoSend, IoPersonCircle } from 'react-icons/io5';
import { RiRobot2Fill } from 'react-icons/ri';
import styles from './Chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm the MIU Guide Assistant. How can I help you today?", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('admission') || text.includes('apply')) return "You can find all admission requirements and deadlines on our Admissions page. Would you like me to take you there?";
    if (text.includes('campus') || text.includes('map')) return "Our campus is located in Obour City. You can explore our interactive campus map in the 'Campus' section!";
    if (text.includes('faculty') || text.includes('major')) return "MIU offers various faculties including Engineering, Pharmacy, Dentistry, and Business Administration. Which one are you interested in?";
    if (text.includes('hello') || text.includes('hi')) return "Hi there! How can I assist you with your MIU journey today?";
    return "That's a great question! For specific details, it's best to check our official website or contact the student affairs office. Is there anything else I can help with?";
  };

  return (
    <div className={styles.chatbotContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <div className={styles.botIconWrapper}>
                  <RiRobot2Fill className={styles.botIcon} />
                  <span className={styles.onlineStatus}></span>
                </div>
                <div>
                  <h3>MIU Assistant</h3>
                  <p>Always online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                <IoClose />
              </button>
            </div>

            {/* Messages */}
            <div className={styles.messagesList}>
              {messages.map((msg) => (
                <div key={msg.id} className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.userMessage : styles.botMessage}`}>
                  {msg.sender === 'bot' && (
                    <div className={styles.msgAvatar}>
                      <RiRobot2Fill />
                    </div>
                  )}
                  <div className={styles.messageBubble}>
                    <p>{msg.text}</p>
                    <span className={styles.messageTime}>{msg.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
                  <div className={styles.msgAvatar}>
                    <RiRobot2Fill />
                  </div>
                  <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                    <div className={styles.typingDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className={styles.chatInput} onSubmit={handleSendMessage}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" disabled={!inputValue.trim()}>
                <IoSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button 
        className={styles.chatbotToggle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex' }}
            >
              <IoClose />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex' }}
            >
              <IoChatbubbleEllipses />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;
