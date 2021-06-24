import { expect } from "chai";
import fetchMock from "fetch-mock";
import { get } from "../../src/api/fetch";
import { Error403 } from "../../src/api/error403";

describe("api", () => {
  describe("get", () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it("kaster Error403 hvis det returneres 403", (done) => {
      const tilgang = {
        harTilgang: false,
        begrunnelse: "begrunnelse",
      };
      fetchMock.get("*", {
        body: tilgang,
        status: 403,
      });

      get("/ingen-url").catch((e: Error403) => {
        expect(e.code).to.equal(403);
        expect(e.message).to.equal(tilgang.begrunnelse);
        done();
      });
    });

    it("legger ved begrunnelse i 403 dersom årsak kommer som message", (done) => {
      const body = {
        message: "begrunnelse",
      };
      fetchMock.get("*", {
        body: body,
        status: 403,
      });

      get("/ingen-url").catch((e: Error403) => {
        expect(e.code).to.equal(403);
        expect(e.message).to.equal(body.message);
        done();
      });
    });

    it("kaster 404-exception hvis det returneres 404", (done) => {
      fetchMock.get("*", 404);
      get("/ingen-url").catch((e) => {
        expect(e.message).to.equal("404");
        done();
      });
    });

    it("kaster exception med vedlagt http kode hvis det returneres > 400", (done) => {
      fetchMock.get("*", 500);
      get("/ingen-url").catch((e) => {
        expect(e.message).to.equal("500");
        done();
      });
    });
  });
});
