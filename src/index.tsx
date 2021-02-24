import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import "./utils/globals";
import "./styles/styles.less";
import AppRouter from "./routers/AppRouter";
import rootSaga from "./sagas/index";
import modiacontext from "./data/modiacontext/modiacontext";
import fastlege from "./data/fastlege/fastlege";
import tilgang from "./data/tilgang/tilgang";
import egenansatt from "./data/egenansatt/egenansatt";
import diskresjonskode from "./data/diskresjonskode/diskresjonskode";
import veilederinfo from "./data/veilederinfo/veilederinfo";
import { fullNaisUrlDefault } from "./utils/miljoUtil";
import {
  pushModiaContext,
  hentAktivEnhet,
} from "./data/modiacontext/modiacontext_actions";
import { CONTEXT_EVENT_TYPE } from "./konstanter";
import { setEventHandlersOnConfig, config } from "./global";

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  modiacontext,
  fastlege,
  tilgang,
  diskresjonskode,
  egenansatt,
  veilederinfo,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const handleChangeEnhet = (data: string) => {
  if (config.config.initiellEnhet !== data) {
    store.dispatch(
      pushModiaContext({
        verdi: data,
        eventType: CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET,
      })
    );
    config.config.initiellEnhet = data;
  }
};

const handlePersonsokSubmit = (nyttFnr: string) => {
  const host = "syfomodiaperson";
  const path = `/sykefravaer/${nyttFnr}`;
  (window as any).location = fullNaisUrlDefault(host, path);
};

setEventHandlersOnConfig(handlePersonsokSubmit, handleChangeEnhet);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

document.addEventListener("DOMContentLoaded", () => {
  if ((window as any).renderDecoratorHead)
    (window as any).renderDecoratorHead(config);
  store.dispatch(
    hentAktivEnhet({
      callback: (aktivEnhet: string) => {
        if (aktivEnhet && config.config.initiellEnhet !== aktivEnhet) {
          config.config.initiellEnhet = aktivEnhet;
          (window as any).renderDecoratorHead(config);
        }
      },
    })
  );
});

export { store, history };
