const fs = require('fs');
const Mustache = require('mustache');

const front = process.argv[2];
const env = process.argv[3];

const timestamp = Date.now().toString();

const dev = {
    timestamp: timestamp,
    buildRoot: 'http://localhost:3040/assets',
    fastlegerestRoot: '/fastlegerest/api',
    modiasyforestRoot: '/modiasyforest/api',
    veilederoppgaverRestRoot: '/syfoveilederoppgaver/api',
    bundleFileName: 'bundle.js',
    decoratorRoot: 'https://app-t6.adeo.no',
    contextholderRoot: 'http://localhost:8090/eventdistributer',
    moteadminHost: 'https://syfomoteadmin.nais.preprod.local',
    enableLogging: true
};

const prod = {
    timestamp: timestamp,
    buildRoot: '/fastlege/js',
    fastlegerestRoot: '/fastlegerest/api',
    modiasyforestRoot: '/modiasyforest/api',
    veilederoppgaverRestRoot: '/syfoveilederoppgaver/api',
    bundleFileName: 'bundle-prod.js',
    decoratorRoot: '',
    contextholderRoot: '/eventdistributer',
    moteadminHost: 'https://syfomoteadmin.nais.adeo.no',
    enableLogging: false
};

fs.readFile(front, (err, data) => {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    if (!fs.existsSync('build/')) {
        fs.mkdirSync('build/');
    }
    fs.writeFile('build/fastlegefront.html', html, 'utf-8', err => {
        if (err) throw err;
    });
});
