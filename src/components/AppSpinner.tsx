import React, { ReactElement } from "react";
import styled from "styled-components";
import { Loader } from "@navikt/ds-react";

interface Props {
  laster: boolean;
  children: ReactElement;
}

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const AppSpinner = ({ laster, children }: Props): ReactElement => {
  return laster ? (
    <SpinnerContainer>
      <Loader size="3xlarge" title="Vent litt mens siden laster" />
    </SpinnerContainer>
  ) : (
    children
  );
};

export default AppSpinner;
