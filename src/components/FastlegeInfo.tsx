import React from "react";
import { Row, Column } from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";
import { EtikettFokus } from "nav-frontend-etiketter";
import { Systemtittel, Undertekst, Element } from "nav-frontend-typografi";
import PersonIkon from "../svg/PersonIkon";
import LegeIkon from "../svg/LegeIkon";
import { tilLangtDatoFormat } from "@/utils/datoUtils";
import {
  AdresseDTO,
  FastlegeDTO,
  PasientDTO,
} from "@/data/fastlege/FastlegeDTO";
import { FastlegeInternal } from "@/data/fastlege/FastlegeInternal";

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
    ? `Postboks ${postadresse.adresse}, ${postadresse.postnummer} ${postadresse.poststed}`
    : VERDI_IKKE_FUNNET;
};

interface FastlegeInfoProps {
  fastlege: FastlegeInternal;
}

const FastlegeInfo = (fastlegeInfoProps: FastlegeInfoProps) => {
  const { fastlege } = fastlegeInfoProps;
  return (
    <div className="fastlegeInfo">
      <Panel>
        <Column className="fastlegeInfo__ikon">
          <PersonIkon />
        </Column>
        <Column>
          <Row className="no-gutter">
            <Column>
              <Systemtittel>
                {fastlege.pasient && hentTekstPasientNavn(fastlege.pasient)}
              </Systemtittel>
              <Undertekst>{fastlege.pasient?.fnr}</Undertekst>
            </Column>
          </Row>
          <Row className="no-gutter fastlegeInfo__etiketter">
            {fastlege.pasient?.egenansatt && (
              <div>
                <EtikettFokus>Egen ansatt</EtikettFokus>
              </div>
            )}
            {fastlege.pasient?.diskresjonskode &&
              fastlege.pasient?.diskresjonskode === "6" && (
                <div>
                  <EtikettFokus>Kode 6</EtikettFokus>
                </div>
              )}
            {fastlege.pasient?.diskresjonskode &&
              fastlege.pasient?.diskresjonskode === "7" && (
                <div>
                  <EtikettFokus>Kode 7</EtikettFokus>
                </div>
              )}
          </Row>
        </Column>
      </Panel>

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
          {fastlege.fastlegekontor && [
            <Row key={1} className="no-gutter">
              <Column className="col-xs-12 col-sm-6">
                <Element>Legekontor</Element>
                <Undertekst>{fastlege.fastlegekontor.navn}</Undertekst>
              </Column>
              <Column className="col-xs-12 col-sm-6">
                <Element>Besøksadresse</Element>
                <Undertekst>
                  {fastlege.fastlegekontor.besoeksadresse &&
                    hentTekstFastlegeBesoeksadresse(
                      fastlege.fastlegekontor.besoeksadresse
                    )}
                </Undertekst>
              </Column>
            </Row>,
            <Row key={2} className="no-gutter">
              <Column className="col-xs-12 col-sm-6">
                <Element>Telefon</Element>
                <Undertekst>{fastlege.fastlegekontor.telefon}</Undertekst>
              </Column>
              <Column className="col-xs-12 col-sm-6">
                <Element>Postadresse</Element>
                <Undertekst>
                  {fastlege.fastlegekontor.postadresse &&
                    hentTekstFastlegePostadresse(
                      fastlege.fastlegekontor.postadresse
                    )}
                </Undertekst>
              </Column>
            </Row>,
          ]}
        </Column>
      </Panel>
    </div>
  );
};

export default FastlegeInfo;
