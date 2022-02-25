import { Coordinates } from "../../../shared/interfaces";
import style from "../styles.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { Dispatch, SetStateAction, useRef } from "react";

interface IContentEditableSpanProps {
  selectedColor: string;
  textPosition: Coordinates | null;
  canvasContext: CanvasRenderingContext2D | null;
  setTextPosition: Dispatch<SetStateAction<Coordinates | null>>;
}

const handleOutsideClick = (
  canvasContext: CanvasRenderingContext2D | null,
  contentEditableSpan: HTMLSpanElement | null,
  textPosition: Coordinates,
  setTextPosition: Dispatch<SetStateAction<Coordinates | null>>,
  selectedColor: string
) => {
  console.log("I CLICK OUTSIDE!!");
  if (canvasContext) {
    const input = contentEditableSpan ? contentEditableSpan.innerHTML : "";
    canvasContext.font = "1.563rem Rubik, sans-serif";
    canvasContext.fillStyle = selectedColor
    canvasContext.fillText(input, textPosition.x, textPosition.y);
    setTextPosition(null);
  }
};

const CotentEditableSpan = ({
  selectedColor,
  textPosition,
  canvasContext,
  setTextPosition,
}: IContentEditableSpanProps) => {
  const contentEditableSpanRef = useRef<HTMLSpanElement>(null);

  if (!textPosition) {
    return null;
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() =>
        handleOutsideClick(
          canvasContext,
          contentEditableSpanRef.current,
          textPosition,
          setTextPosition,
          selectedColor
        )
      }
    >
      <span
        contentEditable
        id={style.contentEditableSpan}
        style={{
          top: `${textPosition.y}px`,
          left: `${textPosition.x}px`,
          color: selectedColor,
        }}
        ref={contentEditableSpanRef}
        spellCheck={false}
      />
    </OutsideClickHandler>
  );
};

export default CotentEditableSpan;
