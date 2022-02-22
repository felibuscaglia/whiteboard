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

  const handleMouseDown = (e: MouseEvent) => {
    switch (activeAction) {
      case Actions.DRAWING:
        startFreeDrawing(e);
        break;
      case Actions.LINE_DRAWING:
        startLineDrawing(e);
        break;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    switch (activeAction) {
      case Actions.DRAWING:
        finishFreeDrawing(e);
        break;
      case Actions.LINE_DRAWING:
        setLineStartingPoints(null);
        break;
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    switch (activeAction) {
      case Actions.DRAWING:
        freeDraw(e);
        break;
      case Actions.LINE_DRAWING:
        lineDraw(e);
        break;
    }
  };

  // Mouse down functions

  const startLineDrawing = ({ nativeEvent }: MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    setLineStartingPoints({ offsetX, offsetY });
  };

  const startFreeDrawing = ({ nativeEvent }: MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Mouse up functions

  const finishFreeDrawing = ({ nativeEvent }: MouseEvent) => {
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

  const lineDraw = ({ nativeEvent }: MouseEvent) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (lineStartingPoints && canvas) {
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.beginPath();
      context?.moveTo(lineStartingPoints.offsetX, lineStartingPoints.offsetY);
      context?.lineTo(
        nativeEvent.pageX - lineStartingPoints.offsetX,
        nativeEvent.pageY - lineStartingPoints.offsetY
      );
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
