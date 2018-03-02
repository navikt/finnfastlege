import './utils/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history.js';
import rootSaga from './sagas/index';
import modiacontext from './reducers/modiacontext';
import fastlege from './reducers/fastlege';
import tilgang from './reducers/tilgang';
import egenansatt from './reducers/egenansatt';
import diskresjonskode from './reducers/diskresjonskode';
import { opprettWebsocketConnection } from './contextHolder';
import { finnMiljoStreng } from './sagas/util';
import { pushModiaContext, hentAktivEnhet } from './actions/modiacontext_actions';

const rootReducer = combineReducers({
    modiacontext,
    history,
    fastlege,
    tilgang,
    diskresjonskode,
    egenansatt,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const config = {
    config: {
        dataSources: {
            veileder: `${window.location.origin}/mote/rest/veilederinfo`,
            enheter: `${window.location.origin}/mote/rest/enheter`,
        },
        toggles: {
            visEnhetVelger: true,
            visVeileder: true,
            visSokefelt: true,
            toggleSendEventVedEnEnhet: false,
        },
        handlePersonsokSubmit: (nyttFnr) => {
            window.location = `https://app${finnMiljoStreng()}.adeo.no/sykefravaer/${nyttFnr}`;
        },
        applicationName: 'Sykefraværsoppfølging',
        handleChangeEnhet: (data) => {
            if (config.config.initiellEnhet !== data) {
                store.dispatch(pushModiaContext({
                    verdi: data,
                    eventType: 'NY_AKTIV_ENHET',
                }));
                config.config.initiellEnhet = data;
            }
        },
    },
};

store.dispatch(hentAktivEnhet({
    callback: (aktivEnhet) => {
        if (aktivEnhet && config.config.initiellEnhet !== aktivEnhet) {
            config.config.initiellEnhet = aktivEnhet;
            window.renderDecoratorHead(config);
        }
    },
}));

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

document.addEventListener('DOMContentLoaded', () => {
    window.renderDecoratorHead && window.renderDecoratorHead(config);
});


opprettWebsocketConnection((wsCallback) => {
    if (wsCallback.data === 'NY_AKTIV_ENHET') {
        store.dispatch(hentAktivEnhet({
            callback: (aktivEnhet) => {
                if (config.config.initiellEnhet !== aktivEnhet) {
                    config.config.initiellEnhet = aktivEnhet;
                    window.renderDecoratorHead(config);
                }
            },
        }));
    }
});

export {
    store,
    history,
};
