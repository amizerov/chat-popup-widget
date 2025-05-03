import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
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

  // Функция для обработки текста с поддержкой Markdown, включая формулы
  const formatMessage = (text) => {
    // Обрабатываем блочные формулы \[ \n...\n \] -> $$...$$
    let formattedText = text.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_, formula) => {
      const trimmedFormula = formula.trim();
      return `$$${trimmedFormula}$$`;
    });
  
    // Обрабатываем строчные формулы \( ... \) -> $...$
    formattedText = formattedText.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_, formula) => {
      const trimmedFormula = formula.trim();
      return `$${trimmedFormula}$`;
    });
  
    //console.log("Formatted:", formattedText); // Для отладки
  
    return (
      <ReactMarkdown
        children={formattedText}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Улучшаем отображение формул
          math: ({node, ...props}) => <div style={{margin: "10px 0"}} {...props} />,
          inlineMath: ({node, ...props}) => <span {...props} />
        }}
        breaks
      />
    );
  };``

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