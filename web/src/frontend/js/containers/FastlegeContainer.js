import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'nav-frontend-grid';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Fastlege from '../components/Fastlege';
import Side from '../sider/Side';
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
        const { fastlege, actions, tilgang } = this.props;
        return (<Side>
            <Column className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
            {
                (() => {
                    if (tilgang.henter) {
                        return (<Row className="row-centered">
                            <NavFrontendSpinner type="XL" />
                        </Row>);
                    } else if (tilgang.hentingFeilet) {
                        return (<Feilmelding
                            tittel="Det skjedde en feil!"
                            melding= {{ __html: '<p>Vi fikk ikke sjekket om du har tilgang til tjenesten. Vennligst prøv igjen senere!</p>' }} />);
                    } else if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel="Ops! Du har visst ikke tilgang til sykefravær i Modia"
                            melding= {{ __html: '<p>For å få tilgang må du ta kontakt med din lokale identansvarlige.</p>' }} />);
                    }
                    return <Fastlege fastlege={fastlege} hentFastlege={actions.hentFastlege} />;
                })()
            }
            </Column>
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
