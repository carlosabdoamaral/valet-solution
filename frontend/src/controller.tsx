import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalculatorComponent } from "./app/components/calculator";

export const Controller = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<CalculatorComponent />} />
      </Routes>
    </BrowserRouter>
  );
};
