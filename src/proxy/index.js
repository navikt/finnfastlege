const proxy = require('express-http-proxy');
const express = require('express');

const router = express.Router();

router.use('/syfo-tilgangskontroll', proxy('syfo-tilgangskontroll.default', {
    proxyReqPathResolver: (req) => {
        return `/syfo-tilgangskontroll/${req.path}`;
    },
    https: false,
}));

module.exports = router;
