import React from "react";
import { useDiskresjonskodeQuery } from "@/data/diskresjonskode/diskresjonskodeQueryHooks";
import { useEgenansattQuery } from "@/data/egenansatt/egenansattQueryHooks";
import { PasientDTO } from "@/data/fastlege/FastlegeDTO";
import styled from "styled-components";
import { devices } from "@/utils/breakpointUtils";
import { Tag } from "@navikt/ds-react";

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    width: fit-content;
    &:not(:last-child) {
      margin-bottom: 0.5em;
    }
  }
  @media only screen and ${devices.md} {
    flex-direction: row;
    > * {
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 0.5em;
      }
    }
  }
`;

interface PersonTagsProps {
  pasient: PasientDTO;
}

export const PersonTags = ({ pasient }: PersonTagsProps) => {
  const { data: diskresjonskode } = useDiskresjonskodeQuery(pasient.fnr);
  const { data: isEgenansatt } = useEgenansattQuery(pasient.fnr);

  return (
    <TagsWrapper>
      {isEgenansatt && <Tag variant={"warning"}>Egen ansatt</Tag>}
      {diskresjonskode === "6" && <Tag variant={"warning"}>Kode 6</Tag>}
      {diskresjonskode === "7" && <Tag variant={"warning"}>Kode 7</Tag>}
    </TagsWrapper>
  );
};
