import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Planner from "../every-country-planner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Planner />
  </StrictMode>
);
