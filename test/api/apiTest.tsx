import { get } from "@/api/axios";
import { ApiErrorException, defaultErrorTexts, ErrorType } from "@/api/errors";
import { describe, expect, it } from "vitest";
import { mockServer } from "../setup";
import { http, HttpResponse } from "msw";

const tilgangDeniedMessage = { message: "Denied!" };
const happyCaseMessage = "Woop woop";

const pathAccessDeniedMessage = "/403message";
const pathNotFound = "/404";
const pathInternalServerError = "/500";
const pathHappyCase = "/200";

describe("Axios API tests", () => {
  describe("Happy case", () => {
    it("returns expected data from http 200", async function () {
      mockServer.use(
        http.get(pathHappyCase, () =>
          HttpResponse.text(happyCaseMessage, { status: 200 })
        )
      );
      const result = await get(pathHappyCase);
      expect(result).to.equal(happyCaseMessage);
    });
  });

  describe("Access denied tests", () => {
    it("Throws access denied for http 403, and handles message", async function () {
      mockServer.use(
        http.get(pathAccessDeniedMessage, () =>
          HttpResponse.json(tilgangDeniedMessage, { status: 403 })
        )
      );
      try {
        await get(pathAccessDeniedMessage);
      } catch (e) {
        expect(e instanceof ApiErrorException).to.equal(true);

        const { error, code } = e as ApiErrorException;
        expect(code).to.equal(403);
        expect(error.type).to.equal(ErrorType.ACCESS_DENIED);
        expect(error.defaultErrorMsg).to.equal(defaultErrorTexts.accessDenied);
      }
    });
  });

  describe("General error tests", () => {
    it("Throws general error for http 404", async function () {
      mockServer.use(
        http.get(pathNotFound, () =>
          HttpResponse.text("Not found", { status: 404 })
        )
      );

      try {
        await get(pathNotFound);
      } catch (e) {
        expect(e instanceof ApiErrorException).to.equal(true);

        const { error, code } = e as ApiErrorException;
        expect(code).to.equal(404);
        expect(error.type).to.equal(ErrorType.GENERAL_ERROR);
      }
    });

    it("Throws general error for http 500", async function () {
      mockServer.use(
        http.get(pathInternalServerError, () =>
          HttpResponse.text("Internal server error", { status: 500 })
        )
      );

      try {
        await get(pathInternalServerError);
      } catch (e) {
        expect(e instanceof ApiErrorException).to.equal(true);

        const { error, code } = e as ApiErrorException;
        expect(code).to.equal(500);
        expect(error.type).to.equal(ErrorType.GENERAL_ERROR);
      }
    });
  });
});
