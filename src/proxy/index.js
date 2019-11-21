const proxy = require('express-http-proxy');
const express = require('express');

const router = express.Router();

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

router.use('/modiasyforest', proxy('modiasyforest.default', {
    proxyReqPathResolver: (req) => {
        return `/modiasyforest${req.path}${getQueryStringFromReq(req)}`;
    },
}));

router.use('/syfomodiacontextholder', proxy('syfomodiacontextholder.default', {
    proxyReqPathResolver: (req) => {
        return `/${req.path}${getQueryStringFromReq(req)}`;
    },
}));

module.exports = router;
