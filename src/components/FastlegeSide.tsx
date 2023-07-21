import React, { useState } from "react";
import FastlegeSearch from "./FastlegeSearch";
import { Fastlege } from "@/components/Fastlege";
import { useQueryClient } from "@tanstack/react-query";
import { fastlegeQueryKeys } from "@/data/fastlege/fastlegeQueryHooks";
import { Heading } from "@navikt/ds-react";
import styled from "styled-components";

const StyledHeading = styled(Heading)`
  margin: 0.5em 0;
  text-align: center;
`;

const texts = {
  title: "Finn fastlegen",
};

const FastlegeSide = () => {
  const [fodselsnummer, setFodselsnummer] = useState<string>();
  const queryClient = useQueryClient();

  return (
    <div>
      <StyledHeading size={"xlarge"}>{texts.title}</StyledHeading>
      <FastlegeSearch
        handleSubmitGyldigFnr={(fnr) => {
          setFodselsnummer(fnr);
          queryClient.invalidateQueries(fastlegeQueryKeys.fastlege(fnr));
        }}
      />
      <Fastlege fnr={fodselsnummer} />
    </div>
  );
};

export default FastlegeSide;
