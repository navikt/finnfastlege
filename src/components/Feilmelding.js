import React from "react";
import PropTypes from "prop-types";
import { Undertittel } from "nav-frontend-typografi";

const Feilmelding = ({
  tittel = "Beklager, det oppstod en feil",
  melding = { __html: "<p>Vennligst prøv igjen litt senere.</p>" },
}) => {
  return (
    <div className="feilmelding panel">
      <Undertittel className="hode hode--feil">{tittel}</Undertittel>
      <div dangerouslySetInnerHTML={melding} />
    </div>
  );
};

Feilmelding.propTypes = {
  tittel: PropTypes.string,
  melding: PropTypes.object,
};

export default Feilmelding;
