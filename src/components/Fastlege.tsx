import React from "react";
import { Sidetittel, Undertekst } from "nav-frontend-typografi";
import AppSpinner from "./AppSpinner";
import Feilmelding from "./Feilmelding";
import FastlegeInfo from "./FastlegeInfo";
import Sokeboks from "./Sokeboks";
import { useSelector } from "react-redux";
import { RootState } from "../data/rootReducer";

export const texts = {
  title: "Finn fastlegen",
  subtitle: "Søk opp fastlegen ved å skrive brukerens fødselsnummer",
  errorTexts: {
    generalErrorTitle: "Beklager, det oppstod en feil",
    generalErrorMessage: "Vennligst prøv igjen litt senere",
    noAccessTitle: "Ingen tilgang",
    noAccessKode6:
      "Bruker har diskresjonskode 6, du har ikke tilgang til å se informasjon om bruker",
    noAccessKode7:
      "Bruker har diskresjonskode 7, du har ikke tilgang til å se informasjon om bruker",
    noAccessEgenAnsatt:
      "Bruker er egen ansatt, du har ikke tilgang til å se informasjon om bruker",
    noAccessSyfo: "Du har ikke tilgang til sykefraværsoppfølgingen",
    noAccessGeografisk: "Personen tilhører et område du ikke har tilgang til",
    noAccessFallback: "Du har ikke tilgang",
    fastlegeNotFoundTitle: "Finner ikke fastlegen",
    fastlegeNotFoundMessage:
      "Det kan hende brukeren ikke har en registrert fastlege. Ta kontakt med brukeren for å få behandlers kontaktopplysninger.",
  },
};

const ikkeTilgangFeilmelding = (ikkeTilgangGrunn: string) => {
  if (ikkeTilgangGrunn === "KODE6") {
    return texts.errorTexts.noAccessKode6;
  } else if (ikkeTilgangGrunn === "KODE7") {
    return texts.errorTexts.noAccessKode7;
  } else if (ikkeTilgangGrunn === "EGEN_ANSATT") {
    return texts.errorTexts.noAccessEgenAnsatt;
  } else if (ikkeTilgangGrunn === "SYFO") {
    return texts.errorTexts.noAccessSyfo;
  } else if (ikkeTilgangGrunn === "GEOGRAFISK") {
    return texts.errorTexts.noAccessGeografisk;
  }
  return texts.errorTexts.noAccessFallback;
};

const Fastlege = () => {
  const fastlege = useSelector((state: RootState) => state.fastlege);

  return (
    <div className="fastlege">
      <Sidetittel>{texts.title}</Sidetittel>
      <div className="fastlege__sokeboks">
        <Undertekst>{texts.subtitle}</Undertekst>
        <Sokeboks />
      </div>
      <AppSpinner laster={fastlege.henter}>
        {(() => {
          if (fastlege.hentingFeilet) {
            return (
              <Feilmelding
                tittel={texts.errorTexts.generalErrorTitle}
                melding={texts.errorTexts.generalErrorMessage}
              />
            );
          } else if (!fastlege.harSoktBruker) {
            return <></>;
          } else if (fastlege.ikkeTilgang) {
            return (
              <Feilmelding
                tittel={texts.errorTexts.noAccessTitle}
                melding={ikkeTilgangFeilmelding(fastlege.ikkeTilgangGrunn)}
              />
            );
          } else if (fastlege.ikkeFunnet) {
            return (
              <Feilmelding
                tittel={texts.errorTexts.fastlegeNotFoundTitle}
                melding={texts.errorTexts.fastlegeNotFoundMessage}
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
