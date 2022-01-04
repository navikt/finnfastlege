import { useQuery } from "react-query";
import { get } from "@/api/axios";
import { Tilgang } from "@/data/tilgang/tilgangTypes";
import { TILGANGSKONTROLL_AD_PATH } from "@/api/constants";

export const tilgangQueryKeys = {
  tilgang: ["tilgang"],
};

export const useTilgangQuery = () => {
  const fetchTilgang = () => get<Tilgang>(TILGANGSKONTROLL_AD_PATH);
  return useQuery(tilgangQueryKeys.tilgang, fetchTilgang);
};
