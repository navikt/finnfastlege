import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get, post } from "../../api";
import * as actions from "./modiacontext_actions";

const modiacontextholderRoot = "/modiacontextholder/api";

export function* pushModiacontextSaga(action) {
  yield put(actions.pusherModiaContext());
  try {
    const path = `${modiacontextholderRoot}/context`;
    yield call(post, path, {
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
    const path = `${modiacontextholderRoot}/context/aktivenhet`;
    const data = yield call(get, path);
    action.data.callback(data.aktivEnhet);
  } catch (e) {
    yield put(actions.hentAktivEnhetFeilet());
  }
}

function* watchPushModiacontext() {
  yield takeEvery(actions.PUSH_MODIACONTEXT_FORESPURT, pushModiacontextSaga);
}

function* watchAktivEnhet() {
  yield takeEvery(actions.HENT_AKTIVENHET_FORESPURT, aktivEnhetSaga);
}

export default function* modiacontextSagas() {
  yield all([fork(watchPushModiacontext), fork(watchAktivEnhet)]);
}
