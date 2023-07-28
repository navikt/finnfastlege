import React, { useState } from "react";
import { Search } from "@navikt/ds-react";
import styled from "styled-components";
import { erGyldigFodselsnummer } from "../utils/fnrValideringUtil";

const texts = {
  label: "Søk opp fastlegen ved å skrive brukerens fødselsnummer",
  feilmelding: "Du må skrive inn et gyldig fødselsnummer (11 siffer)",
};

const SearchFormWrapper = styled.div`
  margin-bottom: 2em;
`;

interface SokeboksProps {
  handleSubmitGyldigFnr(fnr: string): void;
}

const FastlegeSearch = ({ handleSubmitGyldigFnr }: SokeboksProps) => {
  const [value, setValue] = useState("");
  const [valideringsfeil, setValideringsfeil] = useState(false);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const input = value.replace(/\s/g, "");
    if (erGyldigFodselsnummer(input)) {
      handleSubmitGyldigFnr(input);
    } else {
      setValideringsfeil(true);
    }
  };

  const sokefeltEndret = (value: string) => {
    setValue(value);
    setValideringsfeil(false);
  };

  return (
    <SearchFormWrapper>
      <form role="search" onSubmit={onSubmit}>
        <Search
          label={texts.label}
          variant={"primary"}
          error={valideringsfeil ? texts.feilmelding : undefined}
          hideLabel={false}
          onChange={sokefeltEndret}
          autoFocus
        />
      </form>
    </SearchFormWrapper>
  );
};

export default FastlegeSearch;
