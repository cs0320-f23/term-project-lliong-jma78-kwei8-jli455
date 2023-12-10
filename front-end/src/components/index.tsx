import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import "../styles/index.css";
import App from "../App";
=======
import App from "../App";
import { BrowserRouter } from "react-router-dom";
>>>>>>> main

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
