var fs = require("fs");
var Mustache = require("mustache");

front = process.argv[2];
env = process.argv[3];

var timestamp = Date.now().toString();

var dev = {
    timestamp: timestamp,
    buildRoot: 'http://localhost:3040/assets',
    fastlegerestRoot: 'http://localhost:8585/fastlegerest/api',
    modiasyforestRoot: 'http://localhost:8084/modiasyforest/api',
    veilederoppgaverRestRoot: 'http://localhost:8999/syfoveilederoppgaver/api',
    bundleFileName: 'bundle.js',
    decoratorRoot: 'https://app-t6.adeo.no',
    contextholderRoot: 'http://localhost:8090/eventdistributer',
    enableLogging: true,
};

var prod = {
    timestamp: timestamp,
    buildRoot: '/fastlege/js',
    fastlegerestRoot: '/fastlegerest/api',
    modiasyforestRoot: '/modiasyforest/api',
    veilederoppgaverRestRoot: '/syfoveilederoppgaver/api',
    bundleFileName: 'bundle-prod.js',
    decoratorRoot: '',
    contextholderRoot: '/eventdistributer',
    enableLogging: false,
};

fs.readFile(front, function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    fs.writeFile('../main/webapp/fastlegefront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
