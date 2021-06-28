import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { expect } from "chai";
import FastlegeContainer, {
  texts,
} from "../../src/containers/FastlegeContainer";
import rootReducer from "../../src/data/rootReducer";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FastlegeTilgangState } from "../../src/data/tilgang/tilgang";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);

const generalError: FastlegeTilgangState = {
  henter: false,
  hentingFeilet: true,
  harTilgang: false,
  begrunnelse: null,
};

const noAccess: FastlegeTilgangState = {
  henter: false,
  hentingFeilet: false,
  harTilgang: false,
  begrunnelse: "SYFO",
};

const getTilgangWithState = (tilgangState: FastlegeTilgangState) => {
  return {
    tilgang: tilgangState,
  };
};

describe("FastlegeContainerTests", () => {
  it("Manglende tilgang til finnfastlege gir melding om å kontakte identansvarlig", () => {
    const wrapper = mount(
      <Provider
        store={store({ ...realState, ...getTilgangWithState(noAccess) })}
      >
        <FastlegeContainer />
      </Provider>
    );

    const title = wrapper.find(Undertittel).text();
    const message = wrapper.find(Normaltekst).text();

    expect(title).to.equal(texts.noAccessTitle);
    expect(message).to.equal(texts.noAccessMessage);
  });

  it("Feil i kall mot tilgangstjenesten gir generell feilmelding", () => {
    const wrapper = mount(
      <Provider
        store={store({ ...realState, ...getTilgangWithState(generalError) })}
      >
        <FastlegeContainer />
      </Provider>
    );

    const title = wrapper.find(Undertittel).text();
    const message = wrapper.find(Normaltekst).text();

    expect(title).to.equal(texts.generalErrorTitle);
    expect(message).to.equal(texts.generalErrorMessage);
  });
});
