import ReactDOM from 'react-dom/client';
import ChatPopup from './ChatPopup.jsx';
import './ChatPopup.module.scss';

export function mountChatPopup() {
  // Подключаем стили FontAwesome
  const fontAwesomeLink = document.createElement('link');
  fontAwesomeLink.rel = 'stylesheet';
  fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  fontAwesomeLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontAwesomeLink);

  const container = document.createElement('div');
  container.id = 'chat-popup-root';
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  root.render(<ChatPopup />);
}

// Добавляем функцию в глобальный объект window
window.mountChatPopup = mountChatPopup;