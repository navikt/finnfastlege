import { get } from "@/api/axios";
import { useQuery } from "react-query";
import { SYFOPERSON_ROOT } from "@/api/constants";

const diskresjonskodeQueryKeys = {
  diskresjonskode: (fnr: string | undefined) => ["diskresjonskode", fnr],
};

export const useDiskresjonskodeQuery = (fnr: string | undefined) => {
  const path = `${SYFOPERSON_ROOT}/person/diskresjonskode`;
  const fetchDiskresjonskode = () => get<string>(path, fnr);
  return useQuery(
    diskresjonskodeQueryKeys.diskresjonskode(fnr),
    fetchDiskresjonskode,
    { enabled: !!fnr }
  );
};
