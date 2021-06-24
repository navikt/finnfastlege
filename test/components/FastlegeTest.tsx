import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { mount } from "enzyme";

import configureStore from "redux-mock-store";
import { expect } from "chai";
import rootReducer from "../../src/data/rootReducer";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FastlegeState } from "../../src/data/fastlege/fastlege";
import Fastlege, { texts } from "../../src/components/Fastlege";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);

const mockedFastlegeInteral = {
  pasientforhold: {
    fom: new Date(),
    tom: new Date(),
  },
};

const generalError: FastlegeState = {
  ikkeTilgangGrunn: "",
  ikkeTilgang: false,
  harSoktBruker: true,
  henter: false,
  ikkeFunnet: false,
  hentingFeilet: true,
  data: mockedFastlegeInteral,
};

const noAccess: FastlegeState = {
  ikkeTilgangGrunn: "KODE6",
  ikkeTilgang: true,
  harSoktBruker: true,
  henter: false,
  ikkeFunnet: false,
  hentingFeilet: false,
  data: mockedFastlegeInteral,
};

const getFastlegeWithState = (fastlegeState: FastlegeState) => {
  return {
    fastlege: fastlegeState,
  };
};

describe("FastlegeTests", () => {
  it("Feil i kall mot fastlegerest gir generell feilmelding", () => {
    const wrapper = mount(
      <Provider
        store={store({ ...realState, ...getFastlegeWithState(generalError) })}
      >
        <Fastlege />
      </Provider>
    );

    const title = wrapper.find(Undertittel).text();
    const message = wrapper.find(Normaltekst).text();

    expect(title).to.equal(texts.errorTexts.generalErrorTitle);
    expect(message).to.equal(texts.errorTexts.generalErrorMessage);
  });

  it("Manglende tilgang pga kode 6 gir kode 6 feilmelding", () => {
    const wrapper = mount(
      <Provider
        store={store({ ...realState, ...getFastlegeWithState(noAccess) })}
      >
        <Fastlege />
      </Provider>
    );

    const title = wrapper.find(Undertittel).text();
    const message = wrapper.find(Normaltekst).text();

    expect(title).to.equal(texts.errorTexts.noAccessTitle);
    expect(message).to.equal(texts.errorTexts.noAccessKode6);
  });
});
