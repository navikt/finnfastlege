import { useQuery } from "react-query";
import { get } from "@/api/axios";
import { Tilgang } from "@/data/tilgang/tilgangTypes";

const TILGANGSKONTROLL_AD_PATH =
  "/syfo-tilgangskontroll/api/tilgang/navident/syfo";

export const tilgangQueryKeys = {
  tilgang: ["tilgang"],
};

export const useTilgangQuery = () => {
  const fetchTilgang = () => get<Tilgang>(TILGANGSKONTROLL_AD_PATH);
  return useQuery(tilgangQueryKeys.tilgang, fetchTilgang);
};
