import { http, HttpResponse } from "msw";

const NAV_PERSONIDENT_HEADER = "nav-personident";

const diskresjonskode = "7";
const isEgenAnsatt = true;

const mockSyfoperson = [
  http.get("/syfoperson/api/v2/person/diskresjonskode", ({ request }) => {
    if (
      request.headers.has(NAV_PERSONIDENT_HEADER) &&
      request.headers.get(NAV_PERSONIDENT_HEADER)?.length === 11
    ) {
      return HttpResponse.json(diskresjonskode);
    } else {
      return HttpResponse.text("Did not find PersonIdent in headers", {
        status: 400,
      });
    }
  }),

  http.get("/syfoperson/api/v2/person/egenansatt", ({ request }) => {
    if (
      request.headers.has(NAV_PERSONIDENT_HEADER) &&
      request.headers.get(NAV_PERSONIDENT_HEADER)?.length === 11
    ) {
      return HttpResponse.json(isEgenAnsatt);
    } else {
      return HttpResponse.text("Did not find PersonIdent in headers", {
        status: 400,
      });
    }
  }),
];

export default mockSyfoperson;
