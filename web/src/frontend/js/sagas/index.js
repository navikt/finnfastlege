import fastlegeSagas from './fastlegeSagas';
import modiacontextSagas from './modiacontextSagas';
import egenansattSagas from './egenansattSagas';
import diskresjonskodeSagas from './diskresjonskodeSagas';

export default function * rootSaga() {
    yield [
        fastlegeSagas(),
        modiacontextSagas(),
        egenansattSagas(),
        diskresjonskodeSagas(),
    ];
}
