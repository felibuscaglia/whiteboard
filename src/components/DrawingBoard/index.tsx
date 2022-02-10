import { useContext, useEffect, useRef, useState } from "react";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";
import { buttonBlackColor } from "../../shared/constants";
import { transformNumberToPx } from "../../shared/helpers";
import style from './styles.module.scss';

const DrawingBoard = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const { selectedColor } = useContext(WhiteboardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.height = transformNumberToPx(window.innerHeight);
      canvas.style.width = transformNumberToPx(window.innerWidth);

      const context = canvas.getContext("2d");
      if (context) {
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = buttonBlackColor;
        context.lineWidth = 5;
        contextRef.current = context;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) context.strokeStyle = selectedColor;
  }, [selectedColor]);

  const startDrawing = ({ nativeEvent }: any) => {
    // TODO: Change the prop type
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      id={style.drawingBoard}
    />
  );
};

export default DrawingBoard;
