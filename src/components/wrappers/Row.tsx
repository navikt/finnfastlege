import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  margin-bottom: 1em;
  > * {
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
`;
