// See https://docs.nais.io/observability/frontend/?h=faro#auto-configuration
// When deploying as a nais-app, nais will change this config based on environment and set correct parameters
export default {
  telemetryCollectorURL: "http://localhost:12347/collect",
  app: {
    name: "finnfastlege",
    version: "dev",
  },
};
