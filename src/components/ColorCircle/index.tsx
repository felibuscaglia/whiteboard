interface IColorCircleProps {
  color: string;
  height: string;
  width: string;
}

const ColorCircle = ({ color, height, width }: IColorCircleProps) => {
  return (
    <div
      style={{
        borderRadius: "50%",
        backgroundColor: color,
        height,
        width,
      }}
    />
  );
};

export default ColorCircle;
