import { http, HttpResponse } from "msw";

const mockIstilgangskontroll = http.get(
  "/istilgangskontroll/api/tilgang/navident/syfo",
  () => {
    return HttpResponse.json({
      erGodkjent: true,
    });
  }
);

export default mockIstilgangskontroll;
