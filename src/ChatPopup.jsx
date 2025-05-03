import { useState, useEffect, useRef } from 'react';
import ChatBody from './Components/ChatBody.jsx';
import styles from './ChatPopup.module.scss';
import ChatHeader from './components/ChatHeader.jsx';
import ChatInput from './components/ChatInput.jsx';
import ChatToggleButton from './components/TogleButton.jsx';
import { handleSendMessage } from './utils/messageHandler.jsx';

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'assistant', text: 'Привет, как сам?' },
  ]);
  const [isThinking, setIsThinking] = useState(false); // Состояние для анимации
  const chatBodyRef = useRef(null);
  const chatPopupRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const [offset, setOffset] = useState({ right: 20, bottom: 20 });
  const [position, setPosition] = useState({
    x: window.innerWidth - 320 - offset.right,
    y: window.innerHeight - 400 - offset.bottom,
  });

  const [size, setSize] = useState({ width: 300, height: 400 });

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeChat = () => setIsOpen(false);
  const openChat = () => setIsOpen(true);

  const onSendMessage = (userMessage) => {
    setIsThinking(true); // Показываем анимацию
    handleSendMessage(userMessage, setChatHistory, () => setIsThinking(false)); 
    // Скрываем анимацию после ответа
  };

  // Автоскролл вниз при добавлении нового сообщения
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Начало перетаскивания
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Перетаскивание
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      setPosition({ x: newX, y: newY });
      setOffset({
        right: window.innerWidth - newX - size.width,
        bottom: window.innerHeight - newY - size.height,
      });
    }

    if (isResizing) {
      const newWidth = Math.max(200, size.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(200, size.height + (e.clientY - resizeStart.y));

      setSize({ width: newWidth, height: newHeight });
      setResizeStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Завершение перетаскивания или изменения размеров
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Начало изменения размеров
  const handleResizeMouseDown = (e) => {
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
  };

  // Обновление позиции при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      const newX = Math.max(20, window.innerWidth - size.width - offset.right);
      const newY = Math.max(20, window.innerHeight - size.height - offset.bottom);

      setPosition({ x: newX, y: newY });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size, offset]);
  
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <>
      {isOpen ? (
        <div
          className={styles.chatPopup}
          ref={chatPopupRef}
          style={{
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
          }}
        >
          <ChatHeader onClose={closeChat} onMouseDown={handleMouseDown} />
          <ChatBody chatHistory={chatHistory} isThinking={isThinking}  />
          <ChatInput onSendMessage={onSendMessage} />
          <div
            className={styles.resizeHandle}
            onMouseDown={handleResizeMouseDown}
          ></div>
        </div>
      ) : (
        <ChatToggleButton onClick={openChat} />
      )}
    </>
  );
}