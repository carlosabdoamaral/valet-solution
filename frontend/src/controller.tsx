import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalculatorView } from "./app/views/calculator/calculator";
import { DashboardView } from "./app/views/dashboard/dashboard";

export const Controller = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<CalculatorView />} />
        <Route path={"/dashboard"} element={<DashboardView />} />
      </Routes>
    </BrowserRouter>
  );
};
