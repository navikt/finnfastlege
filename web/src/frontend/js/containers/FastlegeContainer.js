import React, { PropTypes, Component } from 'react';
import Fastlege from '../components/Fastlege';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { connect } from 'react-redux';
import * as fastlegeActions from '../actions/fastlege_actions';

export class FastlegeSide extends Component {

    constructor() {
        super();
        fastlegeActions.sjekkFastlegeTilgang();
    }

    render() {
        const { fastlege, hentFastlege, tilgang } = this.props;
        return (<Side>

            {
                (() => {
                    if (tilgang.henter) {
                        return <AppSpinner />;
                    }
                    if (tilgang.hentingFeilet) {
                        return (<Feilmelding tittel="Det skjedde en feil!"
                                             melding= {{ __html: '<p>Vi fikk ikke sjekket om du har tilgang til tjenesten. Vennligst prøv igjen senere!</p>' }} />);
                    }
                    if (tilgang.harTilgang) {
                        return (<Feilmelding tittel="Ops! Du har visst ikke tilgang til sykefraværsoppfølgingen"
                                             melding= {{ __html: '<p>For å få tilgang til disse funksjonene må du ta kontakt med din lokalt ident-ansvarlige.</p>' }} />);
                    }
                    return <Fastlege fastlege={fastlege} hentFastlege={hentFastlege} />;
                })()
            }

        </Side>);
    }
}

FastlegeSide.propTypes = {
    fastlege: PropTypes.object,
    tilgang: PropTypes.object,
    hentFastlege: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        fastlege: state.fastlege,
        tilgang: state.tilgang,
    };
}

const FastlegeContainer = connect(mapStateToProps, Object.assign({}, fastlegeActions))(FastlegeSide);

export default FastlegeContainer;
