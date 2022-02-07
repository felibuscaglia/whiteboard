import styles from "./styles.module.scss";

interface ITooltipProps {
  text: string;
}

const Tooltip = ({ text }: ITooltipProps) => {
  return (
    <div id={styles.tooltip}>
      <div></div>
      <span>{text}</span>
    </div>
  );
};

export default Tooltip;
