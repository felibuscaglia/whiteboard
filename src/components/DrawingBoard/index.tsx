import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";
import { buttonBlackColor } from "../../shared/constants";
import { Actions } from "../../shared/enums";
import { transformNumberToPx } from "../../shared/helpers";
import style from "./styles.module.scss";

interface IDrawingBoardProps {
  activeAction: Actions;
}

interface ILineStartingPoints {
  offsetX: number;
  offsetY: number;
}

const DrawingBoard = ({ activeAction }: IDrawingBoardProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineStartingPoints, setLineStartingPoints] =
    useState<ILineStartingPoints | null>(null);
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

  const handleMouseDown = ({ nativeEvent, pageX, pageY }: MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const offsetLeft = canvas?.offsetLeft || 0;
    const offsetTop = canvas?.offsetTop || 0;
    switch (activeAction) {
      case Actions.DRAWING:
        startFreeDrawing(offsetX, offsetY);
        break;
      case Actions.LINE_DRAWING:
        setLineStartingPoints({
          offsetX: pageX - offsetLeft,
          offsetY: pageY - offsetTop,
        });
        break;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    switch (activeAction) {
      case Actions.DRAWING:
        finishFreeDrawing();
        break;
      case Actions.LINE_DRAWING:
        setLineStartingPoints(null);
        break;
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    const offsetLeft = canvas?.offsetLeft || 0;
    const offsetTop = canvas?.offsetTop || 0;

    switch (activeAction) {
      case Actions.DRAWING:
        freeDraw(e);
        break;
      case Actions.LINE_DRAWING:
        lineDraw(e, offsetLeft, offsetTop);
        break;
    }
  };

  // Mouse down functions

  const startFreeDrawing = (offsetX: number, offsetY: number) => {
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Mouse up functions

  const finishFreeDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  // Mouse move functions

  const freeDraw = ({ nativeEvent }: MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const lineDraw = (
    { pageX, pageY }: MouseEvent,
    offsetLeft: number,
    offsetTop: number
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (lineStartingPoints && canvas) {
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.beginPath();
      context?.moveTo(lineStartingPoints.offsetX, lineStartingPoints.offsetY);
      context?.lineTo(pageX - offsetLeft, pageY - offsetTop);
      context?.stroke();
    }
  };

  return (
    <canvas
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={canvasRef}
      id={style.drawingBoard}
    />
  );
};

export default DrawingBoard;
