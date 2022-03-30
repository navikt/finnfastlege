import React from "react";
import { Column, Row } from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";
import { EtikettFokus } from "nav-frontend-etiketter";
import { Element, Systemtittel, Undertekst } from "nav-frontend-typografi";
import PersonIkon from "../svg/PersonIkon";
import LegeIkon from "../svg/LegeIkon";
import { tilLangtDatoFormat } from "@/utils/datoUtils";
import {
  AdresseDTO,
  FastlegeDTO,
  PasientDTO,
} from "@/data/fastlege/FastlegeDTO";
import {
  FastlegeInternal,
  Fastlegekontor,
  Pasient,
  RelasjonKodeVerdi,
} from "@/data/fastlege/FastlegeInternal";
import { useDiskresjonskodeQuery } from "@/data/diskresjonskode/diskresjonskodeQueryHooks";
import { useEgenansattQuery } from "@/data/egenansatt/egenansattQueryHooks";

const VERDI_IKKE_FUNNET = "Ikke funnet";

export const hentTekstPasientNavn = (pasient: PasientDTO) => {
  return pasient
    ? `${pasient.fornavn} ${pasient.etternavn}`
    : VERDI_IKKE_FUNNET;
};

export const hentTekstFastlegeNavn = (fastlege: FastlegeDTO) => {
  return fastlege
    ? `${fastlege.fornavn} ${fastlege.etternavn}`
    : VERDI_IKKE_FUNNET;
};

export const hentTekstFastlegeBesoeksadresse = (besoeksadresse: AdresseDTO) => {
  return besoeksadresse
    ? `${besoeksadresse.adresse}, ${besoeksadresse.postnummer} ${besoeksadresse.poststed}`
    : VERDI_IKKE_FUNNET;
};

export const hentTekstFastlegePostadresse = (postadresse: AdresseDTO) => {
  return postadresse
    ? `${postadresse.adresse}, ${postadresse.postnummer} ${postadresse.poststed}`
    : VERDI_IKKE_FUNNET;
};

interface FastlegeInfoProps {
  fastlegeList: FastlegeInternal[];
}

const FastlegeInfo = ({ fastlegeList }: FastlegeInfoProps) => {
  const fastlegekontor: Fastlegekontor | undefined = fastlegeList.find(
    (lege) => {
      return lege.fastlegekontor;
    }
  )?.fastlegekontor;
  const pasient: Pasient | undefined = fastlegeList.find((lege) => {
    return lege.pasient;
  })?.pasient;

  const fastlege: FastlegeInternal | undefined = fastlegeList.find((lege) => {
    return lege.relasjon.kodeVerdi == RelasjonKodeVerdi.FASTLEGE;
  });
  const vikarList: FastlegeInternal[] = fastlegeList.filter((lege) => {
    return lege.relasjon.kodeVerdi == RelasjonKodeVerdi.VIKAR;
  });

  const { data: diskresjonskode } = useDiskresjonskodeQuery(pasient?.fnr);
  const { data: isEgenansatt } = useEgenansattQuery(pasient?.fnr);
  return (
    <div className="fastlegeInfo">
      {pasient && (
        <Panel>
          <Column className="fastlegeInfo__ikon">
            <PersonIkon />
          </Column>
          <Column>
            <Row className="no-gutter">
              <Column>
                <Systemtittel>
                  {pasient && hentTekstPasientNavn(pasient)}
                </Systemtittel>
                <Undertekst>{pasient?.fnr}</Undertekst>
              </Column>
            </Row>
            <Row className="no-gutter fastlegeInfo__etiketter">
              {isEgenansatt && (
                <div>
                  <EtikettFokus>Egen ansatt</EtikettFokus>
                </div>
              )}
              {diskresjonskode === "6" && (
                <div>
                  <EtikettFokus>Kode 6</EtikettFokus>
                </div>
              )}
              {diskresjonskode === "7" && (
                <div>
                  <EtikettFokus>Kode 7</EtikettFokus>
                </div>
              )}
            </Row>
          </Column>
        </Panel>
      )}

      <Panel>
        <Column className="fastlegeInfo__ikon">
          <LegeIkon />
        </Column>
        <Column>
          {fastlege && (
            <Row className="no-gutter">
              <Column>
                <Systemtittel>{hentTekstFastlegeNavn(fastlege)}</Systemtittel>
                <Undertekst>{`Fastlege: ${tilLangtDatoFormat(
                  fastlege.pasientforhold.fom
                )} - nå`}</Undertekst>
              </Column>
            </Row>
          )}
          {fastlegekontor && [
            <Row key={1} className="no-gutter">
              <Column className="col-xs-12 col-sm-6">
                <Element>Legekontor</Element>
                <Undertekst>{fastlegekontor.navn}</Undertekst>
              </Column>
              <Column className="col-xs-12 col-sm-6">
                <Element>Besøksadresse</Element>
                <Undertekst>
                  {fastlegekontor.besoeksadresse &&
                    hentTekstFastlegeBesoeksadresse(
                      fastlegekontor.besoeksadresse
                    )}
                </Undertekst>
              </Column>
            </Row>,
            <Row key={2} className="no-gutter">
              <Column className="col-xs-12 col-sm-6">
                <Element>Telefon</Element>
                <Undertekst>{fastlegekontor.telefon}</Undertekst>
              </Column>
              <Column className="col-xs-12 col-sm-6">
                <Element>Postadresse</Element>
                <Undertekst>
                  {fastlegekontor.postadresse &&
                    hentTekstFastlegePostadresse(fastlegekontor.postadresse)}
                </Undertekst>
              </Column>
            </Row>,
          ]}
          {vikarList.map((legevikar, index) => {
            return (
              <Row key={index} className="no-gutter">
                <Column>
                  <Systemtittel>
                    {hentTekstFastlegeNavn(legevikar)}
                  </Systemtittel>
                  <Undertekst>{`Vikarperiode: ${tilLangtDatoFormat(
                    legevikar.gyldighet.fom
                  )} - ${tilLangtDatoFormat(
                    legevikar.gyldighet.tom
                  )}`}</Undertekst>
                  {legevikar.stillingsprosent && (
                    <Undertekst>{`Stillingsprosent: ${legevikar.stillingsprosent}%`}</Undertekst>
                  )}
                </Column>
              </Row>
            );
          })}
        </Column>
      </Panel>
    </div>
  );
};

export default FastlegeInfo;
