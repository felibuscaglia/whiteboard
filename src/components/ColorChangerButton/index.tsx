import { useState } from "react";
import ColorCircle from "../ColorCircle";
import ColorTooltip from "../ColorTooltip";
import style from "./styles.module.scss";

const ColorChangerButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onClick={() => setShowTooltip(!showTooltip)}
      id={style.colorChangerBtn}
    >
      {showTooltip && <ColorTooltip />}
      <div id={style.colorPlaceholder}>
        <ColorCircle color="#F35352" width="75%" height="75%" />
      </div>
    </div>
  );
};

export default ColorChangerButton;
