import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppSpinner from "../components/AppSpinner";
import Fastlege from "../components/Fastlege";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import { RootState } from "@/data/rootReducer";
import { sjekkFastlegeTilgang } from "@/data/tilgang/tilgangActions";

export const texts = {
  generalErrorTitle: "Det skjedde en feil!",
  generalErrorMessage:
    "Vi fikk ikke sjekket om du har tilgang til tjenesten. Vennligst prøv igjen senere!",
  noAccessTitle: "Ops! Du har visst ikke tilgang til sykefravær i Modia",
  noAccessMessage:
    "For å få tilgang må du ta kontakt med din lokale identansvarlige.",
};

const FastlegeSide = () => {
  const { henter, harTilgang, hentingFeilet } = useSelector(
    (state: RootState) => state.tilgang
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sjekkFastlegeTilgang());
  }, []);

  return (
    <Side>
      <AppSpinner laster={henter}>
        {(() => {
          if (hentingFeilet) {
            return (
              <Feilmelding
                tittel={texts.generalErrorTitle}
                melding={texts.generalErrorMessage}
              />
            );
          } else if (!harTilgang) {
            return (
              <Feilmelding
                tittel={texts.noAccessTitle}
                melding={texts.noAccessMessage}
              />
            );
          }
          return <Fastlege />;
        })()}
      </AppSpinner>
    </Side>
  );
};

export default FastlegeSide;
