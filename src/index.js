/* TODO: IE compatibility issue. */
/* import "core-js/stable";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "fast-text-encoding/text"; */
/* MANDATORY IMPORTS */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/appContext";
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter basename="/huldra">
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
