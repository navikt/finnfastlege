import React from "react";
import { Pasient } from "./pasient/Pasient";
import { FastlegeDTO, PasientDTO } from "../data/fastlege/FastlegeDTO";
import { FastlegeInfo } from "./fastlegeinfo/FastlegeInfo";

export const VERDI_IKKE_FUNNET = "Ikke funnet";

interface FastlegeInfoProps {
  fastleger: FastlegeDTO[];
}

const FastlegeSearchResult = ({ fastleger }: FastlegeInfoProps) => {
  const pasient: PasientDTO | undefined = fastleger.find((lege) => {
    return lege.pasient;
  })?.pasient;

  return (
    <div>
      {pasient && <Pasient pasient={pasient} />}
      <FastlegeInfo fastleger={fastleger} />
    </div>
  );
};

export default FastlegeSearchResult;
