import React from "react";
import PropTypes from "prop-types";
import { Row, Column } from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";
import { EtikettFokus } from "nav-frontend-etiketter";
import { Systemtittel, Undertekst, EtikettLiten } from "nav-frontend-typografi";
import PersonIkon from "../svg/PersonIkon";
import LegeIkon from "../svg/LegeIkon";
import { tilLangtDatoFormat } from "../utils/datoUtils";

const VERDI_IKKE_FUNNET = "Ikke funnet";

export const hentTekstPasientNavn = (pasient) => {
  return pasient
    ? `${pasient.fornavn} ${pasient.etternavn}`
    : VERDI_IKKE_FUNNET;
};

export const hentTekstFastlegeNavn = (fastlege) => {
  return fastlege
    ? `${fastlege.fornavn} ${fastlege.etternavn}`
    : VERDI_IKKE_FUNNET;
};

export const hentTekstFastlegeBesoeksadresse = (besoeksadresse) => {
  return besoeksadresse
    ? `${besoeksadresse.adresse}, ${besoeksadresse.postnummer} ${besoeksadresse.poststed}`
    : VERDI_IKKE_FUNNET;
};

export const hentTekstFastlegePostadresse = (postadresse) => {
  return postadresse
    ? `Postboks ${postadresse.adresse}, ${postadresse.postnummer} ${postadresse.poststed}`
    : VERDI_IKKE_FUNNET;
};

const FastlegeInfo = ({ fastlege }) => {
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
                {hentTekstPasientNavn(fastlege.pasient)}
              </Systemtittel>
              <Undertekst>{fastlege.pasient.fnr}</Undertekst>
            </Column>
          </Row>
          <Row className="no-gutter fastlegeInfo__etiketter">
            {fastlege.pasient.egenansatt && (
              <div>
                <EtikettFokus>Egen ansatt</EtikettFokus>
              </div>
            )}
            {fastlege.pasient.diskresjonskode &&
              fastlege.pasient.diskresjonskode === "6" && (
                <div>
                  <EtikettFokus>Kode 6</EtikettFokus>
                </div>
              )}
            {fastlege.pasient.diskresjonskode &&
              fastlege.pasient.diskresjonskode === "7" && (
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
                <EtikettLiten>Legekontor</EtikettLiten>
                <Undertekst>{fastlege.fastlegekontor.navn}</Undertekst>
              </Column>
              <Column className="col-xs-12 col-sm-6">
                <EtikettLiten>Besøksadresse</EtikettLiten>
                <Undertekst>
                  {hentTekstFastlegeBesoeksadresse(
                    fastlege.fastlegekontor.besoeksadresse
                  )}
                </Undertekst>
              </Column>
            </Row>,
            <Row key={2} className="no-gutter">
              <Column className="col-xs-12 col-sm-6">
                <EtikettLiten>Telefon</EtikettLiten>
                <Undertekst>{fastlege.fastlegekontor.telefon}</Undertekst>
              </Column>
              <Column className="col-xs-12 col-sm-6">
                <EtikettLiten>Postadresse</EtikettLiten>
                <Undertekst>
                  {hentTekstFastlegePostadresse(
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

FastlegeInfo.propTypes = {
  fastlege: PropTypes.object,
};

export default FastlegeInfo;
