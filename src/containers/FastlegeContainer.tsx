import React from "react";
import AppSpinner from "../components/AppSpinner";
import Fastlege from "../components/Fastlege";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import { useTilgangQuery } from "@/data/tilgang/tilgangQueryHooks";
import { ApiErrorException } from "@/api/errors";

export const texts = {
  generalErrorTitle: "Det skjedde en feil!",
  generalErrorMessage:
    "Vi fikk ikke sjekket om du har tilgang til tjenesten. Vennligst prøv igjen senere!",
  noAccessTitle: "Ops! Du har visst ikke tilgang til sykefravær i Modia",
  noAccessMessage:
    "For å få tilgang må du ta kontakt med din lokale identansvarlige.",
};

const FastlegeSide = () => {
  const tilgang = useTilgangQuery();

  return (
    <Side>
      <AppSpinner laster={tilgang.isLoading}>
        {(() => {
          if (
            tilgang.error instanceof ApiErrorException &&
            tilgang.error.code === 403
          ) {
            return (
              <Feilmelding
                tittel={texts.noAccessTitle}
                melding={texts.noAccessMessage}
              />
            );
          } else if (tilgang.isError) {
            return (
              <Feilmelding
                tittel={texts.generalErrorTitle}
                melding={texts.generalErrorMessage}
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
