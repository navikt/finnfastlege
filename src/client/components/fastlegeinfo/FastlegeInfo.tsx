import React from "react";
import { Detail, Heading, Label } from "@navikt/ds-react";
import styled from "styled-components";
import {
  AdresseDTO,
  FastlegeDTO,
  FastlegekontorDTO,
  RelasjonKodeVerdi,
} from "../../data/fastlege/FastlegeDTO";
import { VERDI_IKKE_FUNNET } from "../FastlegeSearchResult";
import { SearchResultPanel } from "../wrappers/SearchResultPanel";
import LegeIkon from "../../svg/LegeIkon";
import { Row } from "../wrappers/Row";
import { Column } from "../wrappers/Column";
import { tilLangtDatoFormat } from "../../utils/datoUtils";

const Grid = styled.div`
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(auto, auto) minmax(auto, auto);
  margin-bottom: 1em;
`;

const hentTekstFastlegeNavn = (fastlege: FastlegeDTO) => {
  return fastlege
    ? `${fastlege.fornavn} ${fastlege.etternavn}`
    : VERDI_IKKE_FUNNET;
};

const hentTekstFastlegeBesoeksadresse = (besoeksadresse: AdresseDTO) => {
  return besoeksadresse
    ? `${besoeksadresse.adresse}, ${besoeksadresse.postnummer} ${besoeksadresse.poststed}`
    : VERDI_IKKE_FUNNET;
};

const hentTekstFastlegePostadresse = (postadresse: AdresseDTO) => {
  return postadresse
    ? `${postadresse.adresse}, ${postadresse.postnummer} ${postadresse.poststed}`
    : VERDI_IKKE_FUNNET;
};

interface FastlegeInfoProps {
  fastleger: FastlegeDTO[];
}

export const FastlegeInfo = ({ fastleger }: FastlegeInfoProps) => {
  const fastlege: FastlegeDTO | undefined = fastleger.find((lege) => {
    return lege.relasjon.kodeVerdi === RelasjonKodeVerdi.FASTLEGE;
  });
  const fastlegekontor: FastlegekontorDTO | undefined = fastleger.find(
    (lege) => {
      return lege.fastlegekontor;
    }
  )?.fastlegekontor;
  const vikarList: FastlegeDTO[] = fastleger.filter((lege) => {
    return lege.relasjon.kodeVerdi === RelasjonKodeVerdi.VIKAR;
  });

  return (
    <SearchResultPanel ikon={<LegeIkon />}>
      <>
        {fastlege && (
          <Row>
            <Column>
              <Heading level={"2"} size={"medium"}>
                {hentTekstFastlegeNavn(fastlege)}
              </Heading>
              <Detail>{`Fastlege: ${tilLangtDatoFormat(
                fastlege.pasientforhold.fom
              )} - nå`}</Detail>
            </Column>
          </Row>
        )}
        {fastlegekontor && (
          <Grid>
            <Column>
              <Label>Legekontor</Label>
              <Detail>{fastlegekontor.navn}</Detail>
            </Column>
            <Column>
              <Label>Besøksadresse</Label>
              <Detail>
                {fastlegekontor.besoeksadresse &&
                  hentTekstFastlegeBesoeksadresse(
                    fastlegekontor.besoeksadresse
                  )}
              </Detail>
            </Column>
            <Column>
              <Label>Telefon</Label>
              <Detail>{fastlegekontor.telefon}</Detail>
            </Column>
            <Column>
              <Label>Postadresse</Label>
              <Detail>
                {fastlegekontor.postadresse &&
                  hentTekstFastlegePostadresse(fastlegekontor.postadresse)}
              </Detail>
            </Column>
          </Grid>
        )}
        {vikarList.map((legevikar, index) => {
          return (
            <Row key={index}>
              <Column>
                <Label>{hentTekstFastlegeNavn(legevikar)}</Label>
                <Detail>{`Vikarperiode: ${tilLangtDatoFormat(
                  legevikar.gyldighet.fom
                )} - ${tilLangtDatoFormat(legevikar.gyldighet.tom)}`}</Detail>
                {legevikar.stillingsprosent && (
                  <Detail>{`Stillingsprosent: ${legevikar.stillingsprosent}%`}</Detail>
                )}
              </Column>
            </Row>
          );
        })}
      </>
    </SearchResultPanel>
  );
};
