import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Column } from "nav-frontend-grid";
const DocumentTitle = require("react-document-title");
import ContextContainer from "../context/ContextContainer";

const Side = ({ children }) => {
  return (
    <DocumentTitle title="Fastlege">
      <Container>
        <Row>
          <Column className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
            <ContextContainer />
          </Column>
        </Row>
        <Row>
          <Column className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
            {children}
          </Column>
        </Row>
      </Container>
    </DocumentTitle>
  );
};

Side.propTypes = {
  children: PropTypes.object,
};

export default Side;
