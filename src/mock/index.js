const express = require('express');
const fastlegeRestMock = require('./fastlegeRestMock');
const syfoveilederoppgaverRestMock = require('./syfoveilederoppgaverRestMock');
const auth = require('../auth/authMiddleware');

const router = express.Router();

router.get(
    '/fastlegerest/api/tilgang',
    auth.ensureAuthenticated(true),
    (req, res) => {
        res.status(200).json(fastlegeRestMock.harTilgangRespons);
    },
);

router.get(
    '/fastlegerest/api/fastlege/v1',
    auth.ensureAuthenticated(true),
    (req, res) => {
        res.json(fastlegeRestMock.finnFastlegeRespons);
    },
);

router.get(
    '/syfoveilederoppgaver/api/veilederinfo',
    auth.ensureAuthenticated(true),
    (req, res) => {
        res.json(syfoveilederoppgaverRestMock.veilederInfoResponse);
    },
);

module.exports = router;
