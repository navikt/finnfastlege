import './utils/globals';
import { render } from 'react-dom';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import AppRouter from './routers/AppRouter';
import history from './history';
import rootSaga from './sagas/index';
import modiacontext from './reducers/modiacontext';
import fastlege from './reducers/fastlege';
import tilgang from './reducers/tilgang';
import egenansatt from './reducers/egenansatt';
import diskresjonskode from './reducers/diskresjonskode';
import veilederinfo from './reducers/veilederinfo';
import {
    pushModiaContext,
    hentAktivEnhet,
} from './actions/modiacontext_actions';
import { CONTEXT_EVENT_TYPE } from './konstanter';
import { setEventHandlersOnConfig, config } from './global';

const rootReducer = combineReducers({
    modiacontext,
    history,
    fastlege,
    tilgang,
    diskresjonskode,
    egenansatt,
    veilederinfo,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const handleChangeEnhet = (data) => {
    if (config.config.initiellEnhet !== data) {
        store.dispatch(
            pushModiaContext({
                verdi: data,
                eventType: CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET,
            }),
        );
        config.config.initiellEnhet = data;
    }
};

const handlePersonsokSubmit = () => {
    window.location.href = `/fastlege`;
};

setEventHandlersOnConfig(handlePersonsokSubmit, handleChangeEnhet);

render(
    <Provider store={store}>
        <AppRouter history={history} />
    </Provider>,
    document.getElementById('maincontent'),
);

document.addEventListener('DOMContentLoaded', () => {
    if (window.renderDecoratorHead) window.renderDecoratorHead(config);
    store.dispatch(
        hentAktivEnhet({
            callback: (aktivEnhet) => {
                if (aktivEnhet && config.config.initiellEnhet !== aktivEnhet) {
                    config.config.initiellEnhet = aktivEnhet;
                    window.renderDecoratorHead(config);
                }
            },
        }),
    );
});

export { store, history };
