import React from "react";
import { Sidetittel, Undertekst } from "nav-frontend-typografi";
import AppSpinner from "./AppSpinner";
import Feilmelding from "./Feilmelding";
import FastlegeInfo from "./FastlegeInfo";
import Sokeboks from "./Sokeboks";
import { FastlegeState } from "../data/fastlege/fastlege";

const ikkeTilgangFeilmelding = (ikkeTilgangGrunn: string) => {
  if (ikkeTilgangGrunn === "KODE6") {
    return "Bruker har diskresjonskode 6, du har ikke tilgang til å se informasjon om bruker";
  } else if (ikkeTilgangGrunn === "KODE7") {
    return "Bruker har diskresjonskode 7, du har ikke tilgang til å se informasjon om bruker";
  } else if (ikkeTilgangGrunn === "EGEN_ANSATT") {
    return "Bruker er egen ansatt, du har ikke tilgang til å se informasjon om bruker";
  } else if (ikkeTilgangGrunn === "SYFO") {
    return "Du har ikke tilgang til sykefraværsoppfølgingen";
  } else if (ikkeTilgangGrunn === "GEOGRAFISK") {
    return "Personen tilhører et område du ikke har tilgang til";
  }
  return "Du har ikke tilgang";
};

interface FastlegeProps {
  fastlege: FastlegeState;
}

const Fastlege = ({ fastlege }: FastlegeProps) => {
  return (
    <div className="fastlege">
      <Sidetittel>Finn fastlegen</Sidetittel>
      <div className="fastlege__sokeboks">
        <Undertekst>
          Søk opp fastlegen ved å skrive brukerens fødselsnummer
        </Undertekst>
        <Sokeboks />
      </div>
      <AppSpinner laster={fastlege.henter}>
        {(() => {
          if (fastlege.hentingFeilet) {
            return <Feilmelding />;
          } else if (!fastlege.harSoktBruker) {
            return <></>;
          } else if (fastlege.ikkeTilgang) {
            return (
              <Feilmelding
                tittel="Ingen tilgang"
                melding={{
                  __html: `<p>${ikkeTilgangFeilmelding(
                    fastlege.ikkeTilgangGrunn
                  )}</p>`,
                }}
              />
            );
          } else if (fastlege.ikkeFunnet) {
            return (
              <Feilmelding
                tittel="Finner ikke fastlegen"
                melding={{
                  __html:
                    "<p>Det kan hende brukeren ikke har en registrert fastlege. Ta kontakt med brukeren for å få behandlers kontaktopplysninger.</p>",
                }}
              />
            );
          }
          return <FastlegeInfo fastlege={fastlege.data} />;
        })()}
      </AppSpinner>
    </div>
  );
};

export default Fastlege;
