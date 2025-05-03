// filepath: d:\Argo\chat-popup-widget\src\Components\ChatInput.jsx
import { useState } from 'react';
import styles from './ChatInput.module.scss';

export default function ChatInput({ onSendMessage }) {
  const [userMessage, setUserMessage] = useState('');

  const handleSend = () => {
    if (userMessage.trim()) {
      onSendMessage(userMessage); // Вызываем функцию из пропсов
      setUserMessage(''); // Очищаем поле ввода
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        placeholder="Введите ваш вопрос..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSend} className={styles.sendButton}>
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
}