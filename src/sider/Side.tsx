import React, { useEffect } from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import Decorator from "../decorator/Decorator";

export interface SideProps {
  children: any;
}

const Side = ({ children }: SideProps) => {
  useEffect(() => {
    document.title = "Fastlege";
  }, []);

  return (
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
  );
};

export default Side;
