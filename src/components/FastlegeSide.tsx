import React, { useState } from "react";
import { Sidetittel, Undertekst } from "nav-frontend-typografi";
import Sokeboks from "./Sokeboks";
import { Fastlege } from "@/components/Fastlege";
import { useQueryClient } from "react-query";
import { fastlegeQueryKeys } from "@/data/fastlege/fastlegeQueryHooks";

export const texts = {
  title: "Finn fastlegen",
  subtitle: "Søk opp fastlegen ved å skrive brukerens fødselsnummer",
};

const FastlegeSide = () => {
  const [fodselsnummer, setFodselsnummer] = useState<string>();
  const queryClient = useQueryClient();

  return (
    <div className="fastlege">
      <Sidetittel>{texts.title}</Sidetittel>
      <div className="fastlege__sokeboks">
        <Undertekst>{texts.subtitle}</Undertekst>
        <Sokeboks
          handleSubmitGyldigFnr={(fnr) => {
            setFodselsnummer(fnr);
            queryClient.invalidateQueries(fastlegeQueryKeys.fastlege(fnr));
          }}
        />
      </div>
      <Fastlege fnr={fodselsnummer} />
    </div>
  );
};

export default FastlegeSide;
