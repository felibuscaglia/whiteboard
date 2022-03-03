import { Coordinates } from "../../../shared/interfaces";
import style from "../styles.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

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
  selectedColor: string,
  newCoordinates: Coordinates
) => {
  if (canvasContext && contentEditableSpan) {
    const input = contentEditableSpan.innerHTML;
    canvasContext.font = "1.563rem Rubik, sans-serif";
    canvasContext.fillStyle = selectedColor;
    canvasContext.fillText(input, textPosition.x, textPosition.y);
    contentEditableSpan.innerHTML = "";
    if (newCoordinates.y < window.innerHeight - 59) {
      setTextPosition(newCoordinates);
      contentEditableSpan.focus();
    }
  }
};

const CotentEditableSpan = ({
  selectedColor,
  textPosition,
  canvasContext,
  setTextPosition,
}: IContentEditableSpanProps) => {
  const [spanNode, setSpanNode] = useState<HTMLSpanElement | null>(null);

  const onRefChange = useCallback((node: HTMLSpanElement | null) => {
    setSpanNode(node);
    if (node) {
      node.focus();
    }
  }, []);

  if (!textPosition) {
    return null;
  }

  return (
    <OutsideClickHandler
      onOutsideClick={({ clientX: x, clientY: y }) =>
        handleOutsideClick(
          canvasContext,
          spanNode,
          textPosition,
          setTextPosition,
          selectedColor,
          {
            x,
            y,
          }
        )
      }
    >
      <span
        contentEditable
        id={style.contentEditableSpan}
        style={{
          top: `${textPosition.y - 23}px`,
          left: `${textPosition.x}px`,
          color: selectedColor,
        }}
        ref={onRefChange}
        spellCheck={false}
      />
    </OutsideClickHandler>
  );
};

export default CotentEditableSpan;
