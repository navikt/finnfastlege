import React, { useEffect } from "react";
import Decorator from "../decorator/Decorator";
import { Container } from "@/components/wrappers/Container";
import styled from "styled-components";

const Page = styled.div`
  width: 32em;
`;

export interface SideProps {
  children: React.ReactNode;
}

const Side = ({ children }: SideProps) => {
  useEffect(() => {
    document.title = "Fastlege";
  }, []);

  return (
    <>
      <Decorator />
      <Container>
        <Page>{children}</Page>
      </Container>
    </>
  );
};

export default Side;
