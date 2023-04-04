import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global-style.css";
import Home from "../src/components/Templates/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
