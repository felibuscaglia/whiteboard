import { useContext, useState } from "react";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";
import ColorCircle from "../ColorCircle";
import ColorTooltip from "../ColorTooltip";
import style from "./styles.module.scss";

const ColorChangerButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { colors, selectedColor } = useContext(WhiteboardContext);

  return (
    <div
      onClick={() => setShowTooltip(!showTooltip)}
      id={style.colorChangerBtn}
    >
      {showTooltip && <ColorTooltip colors={colors} />}
      <div id={style.colorPlaceholder}>
        <ColorCircle color={selectedColor} width="75%" height="75%" />
      </div>
    </div>
  );
};

export default ColorChangerButton;
