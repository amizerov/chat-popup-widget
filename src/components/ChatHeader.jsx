import styles from './ChatHeader.module.scss';
import face from '../assets/face1.jpg';

export default function ChatHeader({ onClose, onMouseDown }) {
  return (
    <div className={styles.chatHeader} onMouseDown={onMouseDown}>
      <img src={face} alt="Андрей Прогер" className={styles.chatIcon} />
      <span className={styles.chatTitle}>Андрей Прогер</span>
      <span className={styles.version}>{__APP_VERSION__}</span>
      <button className={styles.closeBtn} onClick={onClose}>
        ✖
      </button>
    </div>
  );
}