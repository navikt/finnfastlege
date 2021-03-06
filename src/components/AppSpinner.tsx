import React, { ReactElement } from "react";
import { Row } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import styled from "styled-components";

interface Props {
  laster: boolean;
  children: ReactElement;
}

const SpinnerContainer = styled(Row)`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const AppSpinner = ({ laster, children }: Props): ReactElement => {
  return laster ? (
    <SpinnerContainer>
      <NavFrontendSpinner type="XL">
        Vent litt mens siden laster
      </NavFrontendSpinner>
    </SpinnerContainer>
  ) : (
    children
  );
};

export default AppSpinner;
