import React, { useCallback } from "react";
import NAVSPA from "@navikt/navspa";
import { DecoratorProps } from "./decoratorProps";
import decoratorConfig from "./decoratorconfig";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  "internarbeidsflate-decorator-v3"
);

const Decorator = () => {
  const aktivBruker = useAktivBruker();

  const handlePersonsokSubmit = (nyttFnr: string) => {
    aktivBruker.mutate(nyttFnr, {
      onSuccess: () => {
        const host = "syfomodiaperson";
        const path = `/sykefravaer`;
        window.location.href = fullNaisUrlDefault(host, path);
      },
    });
  };

  const config = useCallback(decoratorConfig, [handlePersonsokSubmit])(
    handlePersonsokSubmit
  );

  return <InternflateDecorator {...config} />;
};

export default Decorator;
