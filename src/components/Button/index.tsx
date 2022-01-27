import styles from "./styles.module.scss";

interface IButtonProps {
  text: string;
  backgroundColor: string;
  border: string;
  color: string;
}

const Button = ({ text, backgroundColor, border, color }: IButtonProps) => {
  return (
    <button
      id={styles.button}
      style={{
        backgroundColor,
        border,
        color
      }}
    >
      {text}
    </button>
  );
};

export default Button;
