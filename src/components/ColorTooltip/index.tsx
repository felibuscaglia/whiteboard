import ColorCircle from "../ColorCircle";
import style from "./styles.module.scss";

interface IColorTooltip {
  colors: string[];
}

const ColorTooltip = ({ colors }: IColorTooltip) => {
  return (
    <div id={style.colorTooltip}>
      {colors.map((color, i) => (
        <ColorCircle color={color} height="1.125rem" width="1.125rem" key={i} />
      ))}
    </div>
  );
};

export default ColorTooltip;
