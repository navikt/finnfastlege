import React from "react";
import { BodyShort, Heading, Panel } from "@navikt/ds-react";
import styled from "styled-components";
import AlertIkon from "@/svg/AlertTriangle.svg";

const FeilmeldingWrapper = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
      <AlertIkon />
      <Heading level="3" size="small">
        {tittel}
      </Heading>
      <BodyShort size="small">{melding}</BodyShort>
    </FeilmeldingWrapper>
  );
};

export default Feilmelding;
