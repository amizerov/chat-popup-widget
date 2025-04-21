import styles from './ChatBody.module.scss';
import { useEffect, useRef } from 'react';

export default function ChatBody({ chatHistory, isThinking }) {
  const chatBodyRef = useRef(null);

  // Автоскролл вниз при добавлении нового сообщения
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, isThinking]);

  // Функция для обработки текста (замена \n на <br>)
  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className={styles.chatBody} ref={chatBodyRef}>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={
            message.sender === 'user'
              ? styles.userMessage
              : styles.assistantMessage
          }
        >
          {formatMessage(message.text)}
        </div>
      ))}
      {isThinking && (
        <div className={styles.assistantMessage}>
          <span className={styles.typingIndicator}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      )}
    </div>
  );
}