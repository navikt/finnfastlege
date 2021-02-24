import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Fastlege from "../components/Fastlege";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import { sjekkFastlegeTilgang } from "../data/fastlege/fastlege_actions";

const FastlegeSide = () => {
  const fastlege = useSelector((state: any) => state.fastlege);
  const tilgang = useSelector((state: any) => state.tilgang);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sjekkFastlegeTilgang());
  }, []);

  return (
    <Side>
      {(() => {
        if (tilgang.henter) {
          return (
            <Row className="row-centered">
              <NavFrontendSpinner type="XL" />
            </Row>
          );
        } else if (tilgang.hentingFeilet) {
          return (
            <Feilmelding
              tittel="Det skjedde en feil!"
              melding={{
                __html:
                  "<p>Vi fikk ikke sjekket om du har tilgang til tjenesten. Vennligst prøv igjen senere!</p>",
              }}
            />
          );
        } else if (!tilgang.harTilgang) {
          return (
            <Feilmelding
              tittel="Ops! Du har visst ikke tilgang til sykefravær i Modia"
              melding={{
                __html:
                  "<p>For å få tilgang må du ta kontakt med din lokale identansvarlige.</p>",
              }}
            />
          );
        }
        return <Fastlege fastlege={fastlege} />;
      })()}
    </Side>
  );
};

export default FastlegeSide;
