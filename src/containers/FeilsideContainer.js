import React from "react";
import { connect } from "react-redux";
import Feilmelding from "../components/Feilmelding";

export const Feilside = () => {
  return <Feilmelding />;
};

export function mapStateToProps() {
  return {};
}

const FeilsideContainer = connect(mapStateToProps)(Feilside);

export default FeilsideContainer;
