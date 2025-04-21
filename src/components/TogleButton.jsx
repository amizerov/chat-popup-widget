import styles from './TogleButton.module.scss';

export default function ChatToggleButton({ onClick }) {
  return (
    <button className={styles.chatToggleButton} onClick={onClick}>
      ?
    </button>
  );
}