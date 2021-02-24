import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Hovedknapp } from "nav-frontend-knapper";
import { Input } from "nav-frontend-skjema";
import { erGyldigFodselsnummer } from "../utils/fnrValideringUtil";
import { hentFastlege } from "../data/fastlege/fastlege_actions";

const Sokeboks = () => {
  const [value, setValue] = useState("");
  const [valideringsfeil, setValideringsfeil] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (event: any) => {
    event.preventDefault();
    const input = value.replace(/\s/g, "");
    if (erGyldigFodselsnummer(input)) {
      dispatch(hentFastlege(input));
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
