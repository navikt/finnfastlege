import React, { useCallback } from "react";
import NAVSPA from "@navikt/navspa";
import { DecoratorProps } from "./decoratorProps";
import decoratorConfig from "./decoratorconfig";
import { fullNaisUrlDefault } from "../utils/miljoUtil";

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  "internarbeidsflatefs"
);

const Decorator = () => {
  const handlePersonsokSubmit = (nyttFnr: string) => {
    const host = "syfomodiaperson";
    const path = `/sykefravaer/${nyttFnr}`;
    window.location.href = fullNaisUrlDefault(host, path);
  };

  const config = useCallback(decoratorConfig, [handlePersonsokSubmit])(
    handlePersonsokSubmit
  );

  return <InternflateDecorator {...config} />;
};

export default Decorator;
