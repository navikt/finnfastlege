const proxy = require('express-http-proxy');
const express = require('express');

const router = express.Router();

const modiacontextholderUrl =  process.env.ENV === 'preprod'
    ? 'modiacontextholder.q1'
    : 'modiacontextholder.default';

const getQueryStringFromReq = (req) => {
    const queryString = req.url.split('?')[1];
    return queryString
        ? `?${queryString}`
        : '';
};

router.use('/syfo-tilgangskontroll', proxy('syfo-tilgangskontroll.default', {
    proxyReqPathResolver: (req) => {
        return `/syfo-tilgangskontroll${req.path}${getQueryStringFromReq(req)}`;
    },
    https: false,
}));

router.use('/fastlegerest', proxy('fastlegerest.default', {
    proxyReqPathResolver: (req) => {
        return `/fastlegerest${req.path}${getQueryStringFromReq(req)}`;
    },
    https: false,
}));

router.use('/modiacontextholder/api', proxy(modiacontextholderUrl,  {
    proxyReqPathResolver: function(req) {
        return `/modiacontextholder/api${req.url}`
    },
    proxyErrorHandler: function(err, res, next) {
        console.error("Error in proxy for modiacontextholder", err);
        next(err);
    },
    https: false,
}));

router.use('/syfoperson/api', proxy('syfoperson.default', {
    proxyReqPathResolver: (req) => {
        return `/syfoperson/api${req.path}${getQueryStringFromReq(req)}`
    },
}));

module.exports = router;
