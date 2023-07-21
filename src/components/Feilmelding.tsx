import React from "react";
import { BodyShort, Heading, Panel } from "@navikt/ds-react";
import styled from "styled-components";
import AlertIkon from "../../img/svg/report_problem_triangle.svg";

const FeilmeldingWrapper = styled(Panel)`
  text-align: center;
  > * {
    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
`;

interface FeilmeldingProps {
  tittel: string;
  melding: string;
}

const Feilmelding = ({ tittel, melding }: FeilmeldingProps) => {
  return (
    <FeilmeldingWrapper>
      <img src={AlertIkon} height="35px" alt="Alert" />
      <Heading level="3" size="small">
        {tittel}
      </Heading>
      <BodyShort size="small">{melding}</BodyShort>
    </FeilmeldingWrapper>
  );
};

export default Feilmelding;
