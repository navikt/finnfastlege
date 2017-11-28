import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import FastlegeContainer from '../containers/FastlegeContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/fastlege" component={FastlegeContainer} />
        <Route path="/" component={FastlegeContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
