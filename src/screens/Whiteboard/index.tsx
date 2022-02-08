import DrawingBoard from "../../components/DrawingBoard";
import Toolbar from "../../components/Toolbar";
import ButtonBar from "../../components/ButtonBar";

const WhiteboardScreen = () => {
  return (
    <div>
      <ButtonBar />
      <DrawingBoard />
      <Toolbar />
    </div>
  );
};

export default WhiteboardScreen;
