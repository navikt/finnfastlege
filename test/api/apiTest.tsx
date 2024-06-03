import axios from "axios";
import { get } from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import { Tilgang } from "@/data/tilgang/tilgangTypes";
import { ApiErrorException, defaultErrorTexts, ErrorType } from "@/api/errors";
import { describe, expect, it, beforeAll } from "vitest";

let stub: MockAdapter;

const tilgangDenied: Tilgang = { erGodkjent: false };
const tilgangDeniedMessage = { message: "Denied!" };
const happyCaseMessage = "Woop woop";

const pathAccessDenied = "/403tilgang";
const pathAccessDeniedMessage = "/403message";
const pathNotFound = "/404";
const pathInternalServerError = "/500";
const pathHappyCase = "/200";

describe("Axios API tests", () => {
  beforeAll(() => {
    stub = new MockAdapter(axios);
    stub.onGet(pathAccessDenied).replyOnce(403, tilgangDenied);
    stub.onGet(pathAccessDeniedMessage).replyOnce(403, tilgangDeniedMessage);
    stub.onGet(pathNotFound).replyOnce(404);
    stub.onGet(pathInternalServerError).replyOnce(500);
    stub.onGet(pathHappyCase).replyOnce(200, happyCaseMessage);
  });

  describe("Happy case", () => {
    it("returns expected data from http 200", async function () {
      const result = await get(pathHappyCase);
      expect(result).to.equal(happyCaseMessage);
    });
  });

  describe("Access denied tests", () => {
    it("Throws access denied for http 403, and handles message", async function () {
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
