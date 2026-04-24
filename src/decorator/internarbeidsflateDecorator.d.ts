import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DecoratorProps {
  enhet?: string | undefined; // Konfigurasjon av enhet-kontekst
  accessToken?: string | undefined; // Manuell innsending av JWT, settes som Authorization-header
  includeCredentials?: boolean | undefined; // Sett `credentials: 'include'` på outgoing requests til contextholderen
  fnr?: string | undefined; // Konfigurasjon av fødselsnummer-kontekst
  userKey?: string | undefined; // Midlertidig kode i stedet for fnr (se "userKey" under)
  enableHotkeys?: boolean | undefined; // Aktivere hurtigtaster
  fetchActiveEnhetOnMount?: boolean | undefined; // Om enhet er undefined fra container appen, og denne er satt til true, henter den sist aktiv enhet og bruker denne
  fetchActiveUserOnMount?: boolean | undefined; // Om fnr er undefined fra container appen, og denne er satt til true for at den skal hente siste aktiv fnr
  fnrSyncMode?: "sync" | "writeOnly" | "ignore"; // Modus til fnr state management. "sync" er default. "writeOnly" gjør at endringer aldri hentes men vil settes dersom det oppdateres lokalt i appen. "ignore" verken henter fra context eller skriver til context ved oppdatert state lokalt.
  enhetSyncMode?: "sync" | "writeOnly" | "ignore"; // Samme som fnrSyncMode, men for enhet state.
  onEnhetChanged?: (event: CustomEvent<EnhetChangedDetail>) => void; // Kalles når enheten endres
  onFnrChanged?: (event: CustomEvent<FnrChangedDetail>) => void; // Kalles når fnr endres
  onLinkClick?: (event: CustomEvent<LinkClickDetail>) => void; // Kalles ved klikk på menylenker
  appName: string; // Navn på applikasjonen
  hotkeys?: Hotkey[]; // Konfigurasjon av hurtigtaster
  markup?: Markup; // Egen HTML
  showEnheter: boolean; // Vis enheter
  showSearchArea: boolean; // Vis søkefelt
  showHotkeys: boolean; // Vis hurtigtaster
  environment: Environment; // Miljø som skal brukes.
  urlFormat: UrlFormat; // URL format
  proxy?: string | undefined; // Overstyrer URL til contextholderen. Hvis satt, brukes denne verdien som base-URL for alle kall til modia-contextholder.
  websocketUrl?: string | undefined; // Overstyrer WebSocket URL
}

export interface EnhetChangedDetail {
  enhet: string | null;
  enhetObjekt?: Enhet;
}

export interface FnrChangedDetail {
  fnr: string | null;
}

export interface LinkClickDetail {
  text: string;
  url: string;
}

type BooleanAttributeValue = boolean | "";

export interface Markup {
  etterSokefelt?: string; // Gir muligheten for sende inn egen html som blir en del av dekoratøren
}

export interface Enhet {
  readonly enhetId: string;
  readonly navn: string;
}

// Miljø
export type Environment =
  | "q0"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "prod"
  | "local"
  | "mock";

export type UrlFormat = "LOCAL" | "NAV_NO" | "ANSATT"; // UrlFormat. Brukes til lenker i menyen & WS urlen

export interface HotkeyObject {
  char: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
}

export interface HotkeyDescription {
  key: HotkeyObject;
  description: string;
  forceOverride?: boolean;
}

export interface ActionHotKey extends HotkeyDescription {
  action(event: KeyboardEvent): void;
}

export interface DocumentingHotKey extends HotkeyDescription {
  documentationOnly: boolean;
}

export type Hotkey = ActionHotKey | DocumentingHotKey;

export interface DecoratorElementAttributes {
  "app-name": string;
  environment?: Environment;
  "url-format"?: UrlFormat;
  fnr?: string;
  enhet?: string;
  "fnr-sync-mode"?: DecoratorProps["fnrSyncMode"];
  "enhet-sync-mode"?: DecoratorProps["enhetSyncMode"];
  "show-enheter"?: BooleanAttributeValue;
  "show-search-area"?: BooleanAttributeValue;
  "show-hotkeys"?: BooleanAttributeValue;
  "enable-hotkeys"?: BooleanAttributeValue;
  "fetch-active-enhet-on-mount"?: BooleanAttributeValue;
  "fetch-active-user-on-mount"?: BooleanAttributeValue;
  markup?: string;
  hotkeys?: string;
  proxy?: string;
  "websocket-url"?: string;
  "access-token"?: string;
  "include-credentials"?: BooleanAttributeValue;
  "user-key"?: string;
  onEnhetChanged?: (event: CustomEvent<EnhetChangedDetail>) => void;
  onFnrChanged?: (event: CustomEvent<FnrChangedDetail>) => void;
  onLinkClick?: (event: CustomEvent<LinkClickDetail>) => void;
}

export interface InternarbeidsflateDecoratorElement extends HTMLElement {
  addEventListener(
    type: "enhet-changed",
    listener: (event: CustomEvent<EnhetChangedDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "fnr-changed",
    listener: (event: CustomEvent<FnrChangedDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "link-click",
    listener: (event: CustomEvent<LinkClickDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: "enhet-changed",
    listener: (event: CustomEvent<EnhetChangedDetail>) => void,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: "fnr-changed",
    listener: (event: CustomEvent<FnrChangedDetail>) => void,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: "link-click",
    listener: (event: CustomEvent<LinkClickDetail>) => void,
    options?: boolean | EventListenerOptions
  ): void;
}

type InternarbeidsflateDecoratorIntrinsicElement = DetailedHTMLProps<
  HTMLAttributes<InternarbeidsflateDecoratorElement>,
  InternarbeidsflateDecoratorElement
> &
  DecoratorElementAttributes;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "internarbeidsflate-decorator": InternarbeidsflateDecoratorIntrinsicElement;
    }
  }
}

export {};
