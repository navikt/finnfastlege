import React, { PropTypes, Component } from 'react';
import Fastlege from '../components/Fastlege';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fastlegeActions from '../actions/fastlege_actions';

export class FastlegeSide extends Component {

    componentWillMount() {
        const { actions, tilgang } = this.props;
        if (!tilgang.henter) {
            actions.sjekkFastlegeTilgang();
        }
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
                    if (!tilgang.harTilgang) {
                        return (<Feilmelding tittel="Ops! Du har visst ikke tilgang til sykefravær i Modia"
                                             melding= {{ __html: '<p>For å få tilgang må du ta kontakt med din lokale identansvarlige.</p>' }} />);
                    }
                    return <Fastlege fastlege={fastlege} hentFastlege={hentFastlege} />;
                })()
            }

        </Side>);
    }
}

FastlegeSide.propTypes = {
    actions: PropTypes.object,
    fastlege: PropTypes.object,
    tilgang: PropTypes.object,
    hentFastlege: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, fastlegeActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state) {
    return {
        fastlege: state.fastlege,
        tilgang: state.tilgang,
    };
}

const FastlegeContainer = connect(mapStateToProps, mapDispatchToProps)(FastlegeSide);

export default FastlegeContainer;
