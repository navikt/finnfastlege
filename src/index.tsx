import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import "./styles/styles.less";
import AppRouter from "./routers/AppRouter";
import rootSaga from "./sagas";
import fastlege from "./data/fastlege/fastlege";
import tilgang from "./data/tilgang/tilgang";
import egenansatt from "./data/egenansatt/egenansatt";
import diskresjonskode from "./data/diskresjonskode/diskresjonskode";

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  fastlege,
  tilgang,
  diskresjonskode,
  egenansatt,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

export { store, history };
