export const transformNumberToPx = (num: number) => `${num}px`;

export const getRandomElementFromArray = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
