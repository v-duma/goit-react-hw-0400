import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import App from "./components/App";
import "./index.css";

// Встановлюємо основний елемент додатку для модалі
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
