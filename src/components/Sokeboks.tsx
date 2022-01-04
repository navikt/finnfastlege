import React, { useState } from "react";
import { Hovedknapp } from "nav-frontend-knapper";
import { Input } from "nav-frontend-skjema";
import { erGyldigFodselsnummer } from "@/utils/fnrValideringUtil";

interface SokeboksProps {
  handleSubmitGyldigFnr(fnr: string): void;
}

const Sokeboks = ({ handleSubmitGyldigFnr }: SokeboksProps) => {
  const [value, setValue] = useState("");
  const [valideringsfeil, setValideringsfeil] = useState(false);

  const onSubmit = (event: any) => {
    event.preventDefault();
    const input = value.replace(/\s/g, "");
    if (erGyldigFodselsnummer(input)) {
      handleSubmitGyldigFnr(input);
    } else {
      setValideringsfeil(true);
    }
  };

  const sokefeltEndret = (event: any) => {
    setValue(event.target.value);
    setValideringsfeil(false);
  };

  return (
    <div className="sokeboks blokk">
      <form onSubmit={onSubmit}>
        <Input
          feil={
            valideringsfeil
              ? "Du må skrive inn et gyldig fødselsnummer (11 siffer)"
              : undefined
          }
          type="search"
          onChange={sokefeltEndret}
          placeholder="Søk"
          value={value}
        />
        <Hovedknapp>Søk</Hovedknapp>
      </form>
    </div>
  );
};

export default Sokeboks;
