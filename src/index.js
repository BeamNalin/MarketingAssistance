import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./global.css"; // เพิ่มบรรทัดนี้
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
