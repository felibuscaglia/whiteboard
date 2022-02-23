import { Coordinates } from "../interfaces";

export const transformNumberToPx = (num: number) => `${num}px`;

export const getRandomElementFromArray = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const drawInCanvas = (
  canvasContext: CanvasRenderingContext2D,
  moveTo: Coordinates,
  lineTo: Coordinates
) => {
  canvasContext?.beginPath();
  canvasContext?.moveTo(moveTo.x, moveTo.y);
  canvasContext?.lineTo(lineTo.x, lineTo.y);
  canvasContext?.stroke();
};
