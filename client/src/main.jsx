import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "@context/appContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      {" "}
      <App />
    </AppProvider>
  </BrowserRouter>
);
