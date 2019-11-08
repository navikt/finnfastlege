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
    contextholderRoot: 'http://localhost:8090/eventdistributer',
    moteadminHost: 'syfomoteadmin',
    enableLogging: true,
};

const prod = {
    timestamp: timestamp,
    buildRoot: '/fastlege/js',
    fastlegerestRoot: '/fastlegerest/api',
    modiasyforestRoot: '/modiasyforest/api',
    veilederoppgaverRestRoot: '/syfoveilederoppgaver/api',
    bundleFileName: 'bundle-prod.js',
    contextholderRoot: '/eventdistributer',
    moteadminHost: 'syfomoteadmin',
    enableLogging: false,
};

fs.readFile(front, (err, data) => {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    if (!fs.existsSync('build/')) {
        fs.mkdirSync('build/');
    }
    fs.writeFile('build/fastlegefront.html', html, 'utf-8', (writeError) => {
        if (writeError) throw writeError;
    });
});
