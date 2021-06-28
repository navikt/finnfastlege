import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";

interface FeilmeldingProps {
  tittel: string;
  melding: string;
}

const Feilmelding = ({ tittel, melding }: FeilmeldingProps) => {
  return (
    <div className="feilmelding panel">
      <Undertittel className="hode hode--feil">{tittel}</Undertittel>
      <Normaltekst>{melding}</Normaltekst>
    </div>
  );
};

export default Feilmelding;
