import { buttonBlackColor } from "../../shared/constants";
import ColorCircle from "../ColorCircle";
import style from "./styles.module.scss";

const colors = [
  "#F35352",
  "#FF9B3C",
  "#FFD335",
  "#26C281",
  "#2B90EF",
  "#6A46FA",
  "#B05DD9",
  buttonBlackColor,
];

const ColorTooltip = () => {
  return (
    <div id={style.colorTooltip}>
      {colors.map((color) => (
        <ColorCircle color={color} height="1.125rem" width="1.125rem" />
      ))}
    </div>
  );
};

export default ColorTooltip;
