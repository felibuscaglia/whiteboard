import { HiOutlinePencil, HiOutlineMinus } from "react-icons/hi";
import { RiText, RiEraserFill } from "react-icons/ri";
import { BiUndo } from "react-icons/bi";
import style from "./styles.module.scss";
import { buttonBlackColor } from "../../shared/constants";
import { useContext, useState } from "react";
import ColorChangerButton from "../ColorChangerButton";
import { Actions } from "../../shared/enums";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";

const icons = [
  { icon: HiOutlinePencil, action: Actions.DRAWING },
  { icon: HiOutlineMinus, action: Actions.LINE_DRAWING },
  { icon: RiText, action: Actions.TEXT },
  { icon: RiEraserFill },
  { icon: BiUndo },
  { icon: ColorChangerButton },
];

const DEFAULT_SELECTED_OPTION = 0;

const ActionButtons = () => {
  const [selectedOption, setSelectedOption] = useState(DEFAULT_SELECTED_OPTION);
  const [hoveredBtn, setHoveredBtn] = useState<null | number>(null);
  const { setActiveAction } = useContext(WhiteboardContext);

  const handleOnClick = (iconIndex: number, action?: Actions) => {
    // For now, the action param is optional. Remove in the future
    setSelectedOption(iconIndex);
    action && setActiveAction(action);
  };

  return (
    <div id={style.actionButtons}>
      {icons.map(({ icon: Icon, action }, i) => (
        <Icon
          size={"1.875rem"}
          color={
            selectedOption === i || hoveredBtn === i
              ? buttonBlackColor
              : "#C8C8C8"
          }
          cursor="pointer"
          onClick={() => handleOnClick(i, action)}
          onMouseEnter={() => setHoveredBtn(i)}
          onMouseLeave={() => setHoveredBtn(null)}
          key={i}
        />
      ))}
    </div>
  );
};

export default ActionButtons;
