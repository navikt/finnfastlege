import { FASTLEGEREST_ROOT } from "@/api/constants";
import { FastlegeInternal } from "@/data/fastlege/FastlegeInternal";
import { get } from "@/api/axios";
import { useQuery } from "react-query";

export const fastlegeQueryKeys = {
  fastlege: (fnr: string | undefined) => ["fastlege", fnr],
};

export const useFastlegeQuery = (fnr: string | undefined) => {
  const path = `${FASTLEGEREST_ROOT}/fastlege?fnr=${fnr}`;
  const fetchFastlege = () => get<FastlegeInternal>(path);
  return useQuery(fastlegeQueryKeys.fastlege(fnr), fetchFastlege, {
    enabled: !!fnr,
    retry: false,
  });
};
