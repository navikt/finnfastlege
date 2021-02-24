import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertStripe from "nav-frontend-alertstriper";
import { hentVeilederinfo } from "../data/veilederinfo/veilederinfo_actions";

const texts = {
  identNotFound: "Det skjedde en feil: Vi fant ikke din ident",
};

const Context = () => {
  const veilederinfo = useSelector((state: any) => state.veilederinfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentVeilederinfo());
  }, []);

  return (
    <div className="contextContainer">
      {veilederinfo.hentingFeilet && (
        <AlertStripe className="contextContainer__alertstripe" type="advarsel">
          {texts.identNotFound}
        </AlertStripe>
      )}
    </div>
  );
};

export default Context;
