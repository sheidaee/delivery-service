import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";

import App from './App';
import configureStore from "./state/store";

const reduxStore = configureStore();

const RootHtml = (
  <ReduxProvider store={reduxStore}>
    <App />
  </ReduxProvider>
);

ReactDOM.render(RootHtml, document.getElementById("root"));
