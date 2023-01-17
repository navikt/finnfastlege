import { get } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { SYFOPERSON_ROOT } from "@/api/constants";

const egenansattQueryKeys = {
  egenansatt: (fnr: string | undefined) => ["egenansatt", fnr],
};

export const useEgenansattQuery = (fnr: string | undefined) => {
  const path = `${SYFOPERSON_ROOT}/person/egenansatt`;
  const fetchEgenansatt = () => get<boolean>(path, fnr);
  return useQuery(egenansattQueryKeys.egenansatt(fnr), fetchEgenansatt, {
    enabled: !!fnr,
  });
};
