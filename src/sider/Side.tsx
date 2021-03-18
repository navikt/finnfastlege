import React, { useCallback } from "react";
import { Container, Row, Column } from "nav-frontend-grid";
const DocumentTitle = require("react-document-title");
import Decorator from "../decorator/Decorator";

export interface SideProps {
  children: any;
}

const Side = ({ children }: SideProps) => {
  return (
    <DocumentTitle title="Fastlege">
      <>
        <Decorator />

        <Container>
          <Row>
            <Column className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
              {children}
            </Column>
          </Row>
        </Container>
      </>
    </DocumentTitle>
  );
};

export default Side;
