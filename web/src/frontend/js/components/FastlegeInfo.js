import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'nav-frontend-grid';
import { Panel } from 'nav-frontend-paneler';
import { EtikettFokus } from 'nav-frontend-etiketter';
import {
    Systemtittel,
    Undertekst,
    EtikettLiten,
} from 'nav-frontend-typografi';
import PersonIkon from '../svg/PersonIkon';
import LegeIkon from '../svg/LegeIkon';
import { tilLangtDatoFormat } from '../utils/datoUtils';

const FastlegeInfo = ({ fastlege }) => {
    return (<div className="fastlegeInfo">
        <Panel>
            <Column className="fastlegeInfo__ikon">
                <PersonIkon />
            </Column>
            <Column>
                <Row className="no-gutter">
                    <Column>
                        <Systemtittel>{fastlege.pasient.navn}</Systemtittel>
                        <Undertekst>{fastlege.pasient.fnr}</Undertekst>
                    </Column>
                </Row>
                <Row className="no-gutter fastlegeInfo__etiketter">
                    { fastlege.pasient.egenansatt && <div><EtikettFokus>
                        Egen ansatt
                    </EtikettFokus>
                    </div>
                    }
                    { fastlege.pasient.diskresjonskode && fastlege.pasient.diskresjonskode === '6' && <div><EtikettFokus>
                        Kode 6
                    </EtikettFokus>
                    </div>
                    }
                    { fastlege.pasient.diskresjonskode && fastlege.pasient.diskresjonskode === '7' && <div><EtikettFokus>
                        Kode 7
                    </EtikettFokus>
                    </div>
                    }
                </Row>
            </Column>
        </Panel>

        <Panel>
            <Column className="fastlegeInfo__ikon">
                <LegeIkon />
            </Column>
            <Column>
                <Row className="no-gutter">
                    <Column>
                        <Systemtittel>{fastlege.navn}</Systemtittel>
                        <Undertekst>{`Fastlege: ${tilLangtDatoFormat(fastlege.pasientforhold.fom)} - nå`}</Undertekst>
                    </Column>
                </Row>
                <Row className="no-gutter">
                    <Column className="col-xs-12 col-sm-6">
                        <EtikettLiten>Legekontor</EtikettLiten>
                        <Undertekst>{fastlege.fastlegekontor.navn}</Undertekst>
                    </Column>
                    <Column className="col-xs-12 col-sm-6">
                        <EtikettLiten>Besøksadresse</EtikettLiten>
                        <Undertekst>{fastlege.fastlegekontor.besoeksadresse}</Undertekst>
                    </Column>
                </Row>
                <Row className="no-gutter">
                    <Column className="col-xs-12 col-sm-6">
                        <EtikettLiten>Telefon</EtikettLiten>
                        <Undertekst>{fastlege.fastlegekontor.telefon}</Undertekst>
                    </Column>
                    <Column className="col-xs-12 col-sm-6">
                        <EtikettLiten>Postadresse</EtikettLiten>
                        <Undertekst>{fastlege.fastlegekontor.postadresse}</Undertekst>
                    </Column>
                </Row>
            </Column>
        </Panel>
    </div>);
};

FastlegeInfo.propTypes = {
    fastlege: PropTypes.object,
};

export default FastlegeInfo;
