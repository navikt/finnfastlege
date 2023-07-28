import React from "react";
import { PasientDTO } from "../../data/fastlege/FastlegeDTO";
import { VERDI_IKKE_FUNNET } from "../FastlegeSearchResult";
import { SearchResultPanel } from "../wrappers/SearchResultPanel";
import PersonIkon from "../../svg/PersonIkon";
import { Row } from "../wrappers/Row";
import { Column } from "../wrappers/Column";
import { BodyShort, Heading } from "@navikt/ds-react";
import { PersonTags } from "./PersonTags";

const hentTekstPasientNavn = (pasient: PasientDTO) => {
  return pasient
    ? `${pasient.fornavn} ${pasient.etternavn}`
    : VERDI_IKKE_FUNNET;
};

interface PasientProps {
  pasient: PasientDTO;
}

export const Pasient = ({ pasient }: PasientProps) => {
  return (
    <SearchResultPanel ikon={<PersonIkon />}>
      <>
        <Row>
          <Column>
            <Heading level={"2"} size={"medium"}>
              {pasient && hentTekstPasientNavn(pasient)}
            </Heading>
            <BodyShort size={"small"}>{pasient?.fnr}</BodyShort>
          </Column>
        </Row>
        <PersonTags pasient={pasient} />
      </>
    </SearchResultPanel>
  );
};
