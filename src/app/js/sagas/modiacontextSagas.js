import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post } from '../api/index';
import * as actions from '../actions/modiacontext_actions';
import {
    PUSH_MODIACONTEXT_FORESPURT,
    HENT_AKTIVENHET_FORESPURT,
} from '../actions/actiontyper';
import { HOST_NAMES } from '../konstanter';
import { fullNaisUrl } from '../global';

export function* pushModiacontextSaga(action) {
    yield put(actions.pusherModiaContext());
    try {
        const host = HOST_NAMES.SYFOMODIACONTEXTHOLDER;
        const path = `/api/context`;
        const url = fullNaisUrl(host, path);
        yield call(post, url, {
            verdi: action.data.verdi,
            eventType: action.data.eventType,
        });
        yield put(actions.modiaContextPushet());
    } catch (e) {
        yield put(actions.pushModiaContextFeilet());
    }
}

export function* aktivEnhetSaga(action) {
    yield put(actions.henterAktivEnhet());
    try {
        const host = HOST_NAMES.SYFOMODIACONTEXTHOLDER;
        const path = `/api/aktivenhet`;
        const url = fullNaisUrl(host, path);
        const data = yield call(get, url);
        // eslint-disable-next-line no-console
        console.log(data);
        action.data.callback(data.aktivEnhet);
    } catch (e) {
        yield put(actions.hentAktivEnhetFeilet());
    }
}

function* watchPushModiacontext() {
    yield* takeEvery(PUSH_MODIACONTEXT_FORESPURT, pushModiacontextSaga);
}

function* watchAktivEnhet() {
    yield* takeEvery(HENT_AKTIVENHET_FORESPURT, aktivEnhetSaga);
}

export default function* modiacontextSagas() {
    yield [fork(watchPushModiacontext), fork(watchAktivEnhet)];
}
