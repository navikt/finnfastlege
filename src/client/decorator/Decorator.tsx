import React, { useCallback } from "react";
import { AsyncNavspa } from "@navikt/navspa";
import { DecoratorProps } from "./decoratorProps";
import decoratorConfig from "./decoratorconfig";
import { fullNaisUrlDefault } from "../utils/miljoUtil";

const InternflateDecorator = AsyncNavspa.importer<DecoratorProps>({
  appName: "internarbeidsflatefs",
  appBaseUrl: "https://navikt.github.io/internarbeidsflatedecorator/v2.1",
});

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
