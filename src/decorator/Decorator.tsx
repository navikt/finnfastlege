import React, { useLayoutEffect, useRef } from "react";
import { decoratorConfig } from "./decoratorconfig";
import type {
  FnrChangedDetail,
  InternarbeidsflateDecoratorElement,
} from "./internarbeidsflateDecorator";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";

const Decorator = () => {
  const aktivBruker = useAktivBruker();
  const decoratorRef = useRef<InternarbeidsflateDecoratorElement>(null);

  const handlePersonsokSubmit = (nyttFnr: string) => {
    aktivBruker.mutate(nyttFnr, {
      onSuccess: () => {
        const host = "syfomodiaperson";
        const path = `/sykefravaer`;
        window.location.href = fullNaisUrlDefault(host, path);
      },
    });
  };

  useLayoutEffect(() => {
    const decoratorElement = decoratorRef.current;

    if (!decoratorElement) {
      return;
    }

    const onFnrChanged = (event: CustomEvent<FnrChangedDetail>) => {
      const { fnr } = event.detail;

      if (fnr) {
        handlePersonsokSubmit(fnr);
      }
    };

    decoratorElement.addEventListener("fnr-changed", onFnrChanged);

    return () => {
      decoratorElement.removeEventListener("fnr-changed", onFnrChanged);
    };
  }, [handlePersonsokSubmit]);

  return (
    <internarbeidsflate-decorator
      ref={decoratorRef}
      app-name={decoratorConfig.appName}
      fetch-active-enhet-on-mount={true}
      show-enheter={true}
      show-search-area={true}
      environment={decoratorConfig.environment}
      url-format={decoratorConfig.urlFormat}
      proxy={decoratorConfig.proxy}
      fnr-sync-mode={decoratorConfig.fnrSyncMode}
    />
  );
};

export default Decorator;
