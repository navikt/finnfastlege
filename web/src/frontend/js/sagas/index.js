import fastlegeSagas from './fastlegeSagas';
import modiacontextSagas from './modiacontextSagas';

export default function * rootSaga() {
    yield [
        fastlegeSagas(),
        modiacontextSagas(),
    ];
}
