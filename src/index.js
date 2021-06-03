import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import store from "./redux/store";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
