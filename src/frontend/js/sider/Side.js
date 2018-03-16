import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'nav-frontend-grid';
const DocumentTitle = require('react-document-title');

const Side = ({ children }) => {
    return (<DocumentTitle title="Fastlege">
        <Container>
            <Row>
                {children}
            </Row>
        </Container>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
};

export default Side;
