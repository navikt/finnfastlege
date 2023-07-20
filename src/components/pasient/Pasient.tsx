import React from "react";
import PersonIkon from "@/svg/PersonIkon";
import { SearchResultPanel } from "@/components/wrappers/SearchResultPanel";
import { BodyShort, Heading } from "@navikt/ds-react";
import { PersonTags } from "@/components/pasient/PersonTags";
import { Column } from "@/components/wrappers/Column";
import { PasientDTO } from "@/data/fastlege/FastlegeDTO";
import { VERDI_IKKE_FUNNET } from "@/components/FastlegeSearchResult";
import { Row } from "@/components/wrappers/Row";

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
