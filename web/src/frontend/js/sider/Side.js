import React, { PropTypes } from 'react';
const DocumentTitle = require('react-document-title');

const Side = ({ children }) => {
    return (<DocumentTitle title="Fastlege">
        <div className="wrap">
            <div className="grid">
                <div className="unit two-thirds">
                    {children}
                </div>
            </div>
        </div>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
};

export default Side;
