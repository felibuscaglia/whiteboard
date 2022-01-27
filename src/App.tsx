import { BrowserRouter, Route, Routes } from "react-router-dom";
import WhiteboardScreen from "./screens/Whiteboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WhiteboardScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
