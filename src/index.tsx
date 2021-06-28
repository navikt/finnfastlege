import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import "./styles/styles.less";
import rootSaga from "./data/rootSaga";
import rootReducer from "./data/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import FastlegeContainer from "./containers/FastlegeContainer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <FastlegeContainer />
  </Provider>,
  document.getElementById("maincontent")
);

export { store };
