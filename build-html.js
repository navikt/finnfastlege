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
    enableLogging: true
};

const prod = {
    timestamp: timestamp,
    buildRoot: '/fastlege/js',
    fastlegerestRoot: '/fastlegerest/api',
    modiasyforestRoot: '/modiasyforest/api',
    veilederoppgaverRestRoot: '/syfomoteadmin/api/internad/veilederinfo',
    bundleFileName: 'bundle-prod.js',
    decoratorRoot: '',
    contextholderRoot: '/eventdistributer',
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
