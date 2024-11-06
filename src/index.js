import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "src/scss/main.css";
import { SettingsProvider } from "src/context/SettingsContext";

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

serviceWorker.unregister();
