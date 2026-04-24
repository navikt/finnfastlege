import React, { useLayoutEffect, useRef } from "react";
import { decoratorConfig } from "./decoratorconfig";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";

const Decorator = () => {
  const aktivBruker = useAktivBruker();
  const decoratorRef = useRef<InternarbeidsflateDecoratorElement>(null);

  useLayoutEffect(() => {
    const handlePersonsokSubmit = (nyttFnr: string) => {
      aktivBruker.mutate(nyttFnr, {
        onSuccess: () => {
          const host = "syfomodiaperson";
          const path = `/sykefravaer`;
          window.location.href = fullNaisUrlDefault(host, path);
        },
      });
    };

    const decoratorElement = decoratorRef.current;
    if (!decoratorElement) return;

    const onFnrChanged = (event: CustomEvent<FnrChangedDetail>) => {
      const { fnr } = event.detail;
      if (fnr) handlePersonsokSubmit(fnr);
    };

    decoratorElement.addEventListener("fnr-changed", onFnrChanged);

    return () => {
      decoratorElement.removeEventListener("fnr-changed", onFnrChanged);
    };
  });

  return (
    <internarbeidsflate-decorator
      ref={decoratorRef}
      app-name={decoratorConfig.appName}
      fetch-active-enhet-on-mount={String(
        decoratorConfig.fetchActiveEnhetOnMount
      )}
      show-enheter={String(decoratorConfig.showEnheter)}
      show-search-area={String(decoratorConfig.showSearchArea)}
      show-hotkeys={String(decoratorConfig.showHotkeys)}
      environment={decoratorConfig.environment}
      url-format={decoratorConfig.urlFormat}
      proxy={decoratorConfig.proxy}
      fnr-sync-mode={decoratorConfig.fnrSyncMode}
    />
  );
};

export default Decorator;
