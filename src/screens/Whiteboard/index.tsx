import DrawingBoard from "../../components/DrawingBoard";
import Toolbar from "../../components/Toolbar";
import ButtonBar from "../../components/ButtonBar";
import { useState } from "react";
import { buttonBlackColor } from "../../shared/constants";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";
import { Actions } from "../../shared/enums";

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

const DEFAULT_ACTIVE_ACTION = Actions.DRAWING;

const WhiteboardScreen = () => {
  const [selectedColor, setSelectedColor] = useState(colors[colors.length - 1]);
  const [activeAction, setActiveAction] = useState(DEFAULT_ACTIVE_ACTION);

  return (
    <WhiteboardContext.Provider
      value={{ colors, selectedColor, setSelectedColor, setActiveAction }}
    >
      <div>
        <ButtonBar />
        <DrawingBoard activeAction={activeAction} />
        <Toolbar />
      </div>
    </WhiteboardContext.Provider>
  );
};

export default WhiteboardScreen;
