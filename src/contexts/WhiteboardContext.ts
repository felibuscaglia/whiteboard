import { createContext, Dispatch, SetStateAction } from "react";

interface IWhiteboardContextDefaultValue {
  colors: string[];
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

const defaultValue: IWhiteboardContextDefaultValue = {
  colors: ["black", "white"],
  selectedColor: "white",
  setSelectedColor: () => {},
};

export const WhiteboardContext = createContext(defaultValue);
