import DrawingBoard from "../../components/DrawingBoard";
import Toolbar from "../../components/Toolbar";
import ButtonBar from "../../components/ButtonBar";
import { useState } from "react";
import { buttonBlackColor } from "../../shared/constants";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";

const colors = [
  "#F35352",
  "#FF9B3C",
  "#FFD335",
  "#26C281",
  "#2B90EF",
  "#6A46FA",
  "#B05DD9",
  buttonBlackColor,
];

const WhiteboardScreen = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  return (
    <WhiteboardContext.Provider
      value={{ colors, selectedColor, setSelectedColor }}
    >
      <div>
        <ButtonBar />
        <DrawingBoard />
        <Toolbar />
      </div>
    </WhiteboardContext.Provider>
  );
};

export default WhiteboardScreen;
