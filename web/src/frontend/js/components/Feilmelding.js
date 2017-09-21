import React, { PropTypes } from 'react';

const Feilmelding = ({ tittel = 'Beklager, det oppstod en feil', melding = { __html: '<p>Vennligst prøv igjen litt senere.</p>' } }) => {
    return (<div className="panel panel--melding">
            <h3 className="hode hode--feil">{tittel}</h3>
            <div dangerouslySetInnerHTML={melding} />
    </div>);
};

Feilmelding.propTypes = {
    tittel: PropTypes.string,
    melding: PropTypes.object,
};

export default Feilmelding;
