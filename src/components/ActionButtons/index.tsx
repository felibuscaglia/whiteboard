import { HiOutlinePencil, HiOutlineMinus } from "react-icons/hi";
import { RiText, RiEraserFill } from "react-icons/ri";
import { BiUndo } from "react-icons/bi";
import style from "./styles.module.scss";
import { buttonBlackColor } from "../../shared/constants";
import { useState } from "react";
import ColorChangerButton from "../ColorChangerButton";

const icons = [
  { icon: HiOutlinePencil },
  { icon: HiOutlineMinus },
  { icon: RiText },
  { icon: RiEraserFill },
  { icon: BiUndo },
  { icon: ColorChangerButton }
];

const DEFAULT_SELECTED_OPTION = 0;

const ActionButtons = () => {
  const [selectedOption, setSelectedOption] = useState(DEFAULT_SELECTED_OPTION);
  const [hoveredBtn, setHoveredBtn] = useState<null | number>(null);

  return (
    <div id={style.actionButtons}>
      {icons.map(({ icon: Icon }, i) => (
        <Icon
          size={"1.875rem"}
          color={
            selectedOption === i || hoveredBtn === i
              ? buttonBlackColor
              : "#C8C8C8"
          }
          cursor="pointer"
          onClick={() => setSelectedOption(i)}
          onMouseEnter={() => setHoveredBtn(i)}
          onMouseLeave={() => setHoveredBtn(null)}
        />
      ))}
    </div>
  );
};

export default ActionButtons;
