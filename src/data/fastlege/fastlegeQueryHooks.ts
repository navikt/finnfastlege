import { FASTLEGEREST_ROOT } from "@/api/constants";
import { get } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { FastlegeDTO } from "@/data/fastlege/FastlegeDTO";

export const fastlegeQueryKeys = {
  fastlege: (fnr: string | undefined) => ["fastlege", fnr],
};

export const useFastlegeQuery = (fnr: string | undefined) => {
  const path = `${FASTLEGEREST_ROOT}/fastlege/fastleger`;
  const fetchFastlege = () => get<FastlegeDTO[]>(path, fnr);
  return useQuery({
    queryKey: fastlegeQueryKeys.fastlege(fnr),
    queryFn: fetchFastlege,
    enabled: !!fnr,
    retry: false,
  });
};
