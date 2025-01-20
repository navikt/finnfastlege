import styled from "styled-components";
import { ReactNode } from "react";

interface RowProps {
  children?: ReactNode;
}

export const Row = styled.div<RowProps>`
  display: flex;
  margin-bottom: 1em;
  > * {
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
`;
