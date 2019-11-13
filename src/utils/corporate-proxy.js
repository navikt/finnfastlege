/* eslint-disable no-param-reassign */
const { custom } = require('openid-client');
const tunnel = require('tunnel');
const { proxyUrl } = require('../serverConfig');
const LOG = require('../logger');

const agent = (proxyUri) => {
    if (proxyUri) {
        const hostPort = proxyUri
            .replace('https://', '')
            .replace('http://', '')
            .split(':', 2);
        return tunnel.httpsOverHttp({
            proxy: {
                host: hostPort[0],
                port: hostPort[1],
            },
        });
    }
    return null;
};

exports.setup = (object) => {
    const proxyUri = proxyUrl;
    const proxyAgent = agent(proxyUri);
    if (proxyAgent) {
        // console.log(`Proxying requests via ${proxyUri} for '${object.constructor.name}'`);
        object[custom.http_options] = (options) => {
            options.agent = proxyAgent;
            return options;
        };
    } else {
        LOG.info(
            `Environment variable HTTP_PROXY is not set, not proxying requests for '${object.constructor.name}'`,
        );
    }
};
