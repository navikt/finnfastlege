import React, { ReactElement } from "react";
import { Panel } from "@navikt/ds-react";
import styled from "styled-components";
import { Column } from "./Column";
import { devices } from "../../utils/breakpointUtils";

const StyledPanel = styled(Panel)`
  margin-bottom: 0.5em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  @media only screen and ${devices.sm} {
    flex-direction: row;
  }
`;

const StyledIkonWrapper = styled.div`
  margin-right: 2em;
`;

interface SearchResultProps {
  ikon: ReactElement;
  children: ReactElement;
}

export const SearchResultPanel = ({ ikon, children }: SearchResultProps) => {
  return (
    <StyledPanel>
      <StyledIkonWrapper>{ikon}</StyledIkonWrapper>
      <Column>{children}</Column>
    </StyledPanel>
  );
};
