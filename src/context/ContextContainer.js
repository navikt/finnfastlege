/* eslint-disable react/no-danger */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AlertStripe from "nav-frontend-alertstriper";
import { hentAktivEnhet } from "../data/modiacontext/modiacontext_actions";
import { hentVeilederinfo } from "../data/veilederinfo/veilederinfo_actions";

const texts = {
  identNotFound: "Det skjedde en feil: Vi fant ikke din ident",
};

export class Context extends Component {
  componentDidMount() {
    const { actions, skalHenteVeilederinfo } = this.props;
    if (skalHenteVeilederinfo) {
      actions.hentVeilederinfo();
    }
  }

  render() {
    const { veilederinfo } = this.props;

    return (
      <div className="contextContainer">
        {veilederinfo.hentingFeilet && (
          <AlertStripe
            className="contextContainer__alertstripe"
            type="advarsel"
          >
            {texts.identNotFound}
          </AlertStripe>
        )}
      </div>
    );
  }
}

Context.propTypes = {
  actions: PropTypes.object,
  veilederinfo: PropTypes.object,
  skalHenteVeilederinfo: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  const actions = {
    hentAktivEnhet,
    hentVeilederinfo,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export function mapStateToProps(state) {
  const { veilederinfo } = state;
  const skalHenteVeilederinfo = !(
    veilederinfo.henter ||
    veilederinfo.hentet ||
    veilederinfo.hentingFeilet
  );
  return {
    veilederinfo,
    skalHenteVeilederinfo,
  };
}

const ContextContainer = connect(mapStateToProps, mapDispatchToProps)(Context);

export default ContextContainer;
