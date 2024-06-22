import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="abz-task/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
