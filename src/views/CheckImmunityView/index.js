
import React from "react";
import { useEffect, Fragment, useState } from 'react';

import CheckImmunityForm from './form';
import Certificate from './certificate';
import {enableInfura} from '../../blockchain';

const CheckImmunityView = () => {
  const [certificate, setCertificate] = useState({});
  const [isCertificateFetched, setIsCertificateFetched] = useState(false);
  useEffect(() => {
    enableInfura();
  }, []);
  return (
    <Fragment>
      <div className="row">
        <div className="column">
          <h2>Check Immunity</h2>
          <CheckImmunityForm setCertificate={setCertificate} setIsCertificateFetched={setIsCertificateFetched} />
        </div>
      </div>
      { isCertificateFetched && <Certificate certificate={certificate} /> }
    </Fragment>

  );
};

export default CheckImmunityView;
