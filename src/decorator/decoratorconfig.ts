import { DecoratorProps, EnhetDisplay, FnrDisplay } from "./decoratorProps";

const RESET_VALUE = "\u0000";

const decoratorconfig = (setFnr: (fnr: string) => void): DecoratorProps => {
  return {
    appname: "Sykefraværsoppfølging",
    fnr: {
      initialValue: RESET_VALUE,
      display: FnrDisplay.SOKEFELT,
      ignoreWsEvents: true,
      skipModal: true,
      onChange: (value) => {
        if (value) {
          setFnr(value);
        }
      },
    },
    enhet: {
      initialValue: undefined,
      display: EnhetDisplay.ENHET_VALG,
      onChange(): void {},
      skipModal: true,
    },
    toggles: {
      visVeileder: true,
    },
    useProxy: true,
  };
};

export default decoratorconfig;
