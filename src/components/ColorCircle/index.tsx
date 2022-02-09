import { useContext } from "react";
import { WhiteboardContext } from "../../contexts/WhiteboardContext";

interface IColorCircleProps {
  color: string;
  height: string;
  width: string;
}

const ColorCircle = ({ color, height, width }: IColorCircleProps) => {
  const { setSelectedColor } = useContext(WhiteboardContext);
  return (
    <div
      style={{
        borderRadius: "50%",
        backgroundColor: color,
        height,
        width,
      }}
      onClick={() => setSelectedColor(color)}
    />
  );
};

export default ColorCircle;
