import { useFastlegeQuery } from "@/data/fastlege/fastlegeQueryHooks";
import { ApiErrorException, getErrorMessage } from "@/api/errors";
import Feilmelding from "@/components/Feilmelding";
import FastlegeInfo from "@/components/FastlegeInfo";
import AppSpinner from "@/components/AppSpinner";
import React from "react";

export const texts = {
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
};

const ikkeTilgangFeilmelding = (ikkeTilgangGrunn: string) => {
  if (ikkeTilgangGrunn === "KODE6") {
    return texts.noAccessKode6;
  } else if (ikkeTilgangGrunn === "KODE7") {
    return texts.noAccessKode7;
  } else if (ikkeTilgangGrunn === "EGEN_ANSATT") {
    return texts.noAccessEgenAnsatt;
  } else if (ikkeTilgangGrunn === "SYFO") {
    return texts.noAccessSyfo;
  } else if (ikkeTilgangGrunn === "GEOGRAFISK") {
    return texts.noAccessGeografisk;
  }
  return texts.noAccessFallback;
};

interface FastlegeProps {
  fnr: string | undefined;
}

export const Fastlege = ({ fnr }: FastlegeProps) => {
  const { isLoading, isError, error, data } = useFastlegeQuery(fnr);
  const ikkeTilgang = error instanceof ApiErrorException && error.code === 403;
  const ikkeFunnet = error instanceof ApiErrorException && error.code === 404;

  return (
    <AppSpinner laster={isLoading}>
      {(() => {
        if (ikkeTilgang) {
          return (
            <Feilmelding
              tittel={texts.noAccessTitle}
              melding={ikkeTilgangFeilmelding(getErrorMessage(error))}
            />
          );
        } else if (ikkeFunnet) {
          return (
            <Feilmelding
              tittel={texts.fastlegeNotFoundTitle}
              melding={texts.fastlegeNotFoundMessage}
            />
          );
        } else if (isError) {
          return (
            <Feilmelding
              tittel={texts.generalErrorTitle}
              melding={texts.generalErrorMessage}
            />
          );
        }
        return data ? <FastlegeInfo fastlege={data} /> : <></>;
      })()}
    </AppSpinner>
  );
};
