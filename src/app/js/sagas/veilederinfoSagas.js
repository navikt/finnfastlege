import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/veilederinfo_actions';
import { HENT_VEILEDERINFO_FORESPURT } from '../actions/actiontyper';
import { fullNaisUrl } from '../global';

export function* hentVeilederinfoSaga() {
    yield put(actions.henterVeilederinfo());
    try {
        // eslint-disable-next-line no-console
        console.log(window.APP_SETTINGS);
        const url = fullNaisUrl(
            window.APP_SETTINGS.MOTEADMIN_HOST,
            '/syfomoteadmin/api/internad/veilederinfo',
        );
        const data = yield call(get, url);
        yield put(actions.veilederinfoHentet(data));
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        yield put(actions.hentVeilederinfoFeilet());
    }
}

function* watchHentVeilederinfo() {
    yield* takeEvery(HENT_VEILEDERINFO_FORESPURT, hentVeilederinfoSaga);
}

export default function* veilederinfoSagas() {
    yield [fork(watchHentVeilederinfo)];
}
