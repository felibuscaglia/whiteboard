import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";
import { buttonBlackColor } from "../../shared/constants";
import { Actions } from "../../shared/enums";
import { drawInCanvas, transformNumberToPx } from "../../shared/helpers";
import { Coordinates } from "../../shared/interfaces";
import style from "./styles.module.scss";

interface IDrawingBoardProps {
  activeAction: Actions;
}

const finishLineDrawing = (
  setLineStartingPoints: Dispatch<SetStateAction<Coordinates | null>>,
  moveTo: Coordinates | null,
  lineTo: Coordinates,
  canvasContext?: CanvasRenderingContext2D | null
) => {
  setLineStartingPoints(null);
  canvasContext && moveTo && drawInCanvas(canvasContext, moveTo, lineTo);
};

const setCanvasProperties = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D | null
) => {
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  canvas.style.height = transformNumberToPx(window.innerHeight);
  canvas.style.width = transformNumberToPx(window.innerWidth);

  if (context) {
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = buttonBlackColor;
    context.lineWidth = 5;
  }
};

const DrawingBoard = ({ activeAction }: IDrawingBoardProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineStartingPoints, setLineStartingPoints] =
    useState<Coordinates | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineDrawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const { selectedColor } = useContext(WhiteboardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      setCanvasProperties(canvas, context);
      contextRef.current = context;
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
          x: pageX - offsetLeft,
          y: pageY - offsetTop,
        });
        break;
    }
  };

  const handleMouseUp = ({ pageX, pageY }: MouseEvent) => {
    switch (activeAction) {
      case Actions.DRAWING:
        finishFreeDrawing();
        break;
      case Actions.LINE_DRAWING:
        const canvas = canvasRef.current;
        const offsetLeft = canvas?.offsetLeft || 0;
        const offsetTop = canvas?.offsetTop || 0;
        const lineTo = {
          x: pageX - offsetLeft,
          y: pageY - offsetTop,
        };
        const canvasContext = canvas?.getContext("2d");
        finishLineDrawing(
          setLineStartingPoints,
          lineStartingPoints,
          lineTo,
          canvasContext
        );
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
    const lineCanvas = lineDrawingCanvasRef.current;
    const lineCanvasContext = lineCanvas?.getContext("2d");
    if (lineStartingPoints && lineCanvas && lineCanvasContext) {
      setCanvasProperties(lineCanvas, lineCanvasContext); // Only do it one time. Here's repeated.
      const lineTo: Coordinates = {
        x: pageX - offsetLeft,
        y: pageY - offsetTop,
      };
      drawInCanvas(lineCanvasContext, lineStartingPoints, lineTo);
    }
  };

  return (
    <>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        id={style.drawingBoard}
      />
      {activeAction === Actions.LINE_DRAWING && (
        <canvas
          id={style.lineDrawingBoard}
          ref={lineDrawingCanvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      )}
    </>
  );
};

export default DrawingBoard;

// TODO Before merging:
// - Display the second canvas all the time, change the visibility with CSS
// - Extract all those functions to outside the component
// - Only set the second canvas properties once.
