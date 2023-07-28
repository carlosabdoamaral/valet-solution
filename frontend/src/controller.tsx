import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalculatorView } from "./app/views/calculator";

export const Controller = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<CalculatorView />} />
      </Routes>
    </BrowserRouter>
  );
};
