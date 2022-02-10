import { createContext, Dispatch, SetStateAction } from "react";
import { Actions } from "../shared/enums";

interface IWhiteboardContextDefaultValue {
  colors: string[];
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  setActiveAction: Dispatch<SetStateAction<Actions>>;
}

const defaultValue: IWhiteboardContextDefaultValue = {
  colors: ["black", "white"],
  selectedColor: "white",
  setSelectedColor: () => {},
  setActiveAction: () => {},
};

export const WhiteboardContext = createContext(defaultValue);
