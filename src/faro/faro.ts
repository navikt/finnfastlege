import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
} from "@grafana/faro-web-sdk";
import nais from "../../nais.js";

export const initFaro = (): Faro => {
  const telemetryCollectorUrl =
    process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL;
  const appName = process.env.NAIS_APP_NAME;
  const appVersion = process.env.NAIS_APP_IMAGE;
  console.log("Telemetry URL: ", nais.telemetryCollectorURL);
  console.log("Telemetry URL: ", telemetryCollectorUrl);
  console.log("App ", nais.app.name);
  console.log("App ", appName);
  console.log("Version ", nais.app.version);
  console.log("Version ", appVersion);
  return initializeFaro({
    url: telemetryCollectorUrl,
    app: {
      name: appName,
      version: appVersion,
    },
    instrumentations: [...getWebInstrumentations()],
  });
};
