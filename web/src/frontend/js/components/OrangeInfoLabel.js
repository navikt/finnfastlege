import React, { PropTypes } from 'react';

const OrangeInfoLabel = ({ tekst }) => {
    return (<label className="infolabel">
        {tekst}
    </label>);
};

OrangeInfoLabel.propTypes = {
    tekst: PropTypes.string,
};

export default OrangeInfoLabel;
