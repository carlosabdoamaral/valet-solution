import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { Controller } from "./controller";
import "./app/components/main.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Controller />
    <ToastContainer />
  </>
);

reportWebVitals();
