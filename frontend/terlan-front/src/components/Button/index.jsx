import styles from './styles.module.css';

export default function Button({ children, type = "button", onClick, color = "green", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={color === "green" ? styles.greenBtn : styles.blackBtn}
      {...props}
    >
      {children}
    </button>
  );
}
