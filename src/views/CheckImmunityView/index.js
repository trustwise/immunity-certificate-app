
import React from "react";
import { Fragment, useEffect, useRef, useState } from 'react';

import CheckImmunityForm from './form';
import CertificateResult from './result';
import {enableInfura} from '../../blockchain';

const CheckImmunityView = () => {
  const resultRef = useRef(null);
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
          <CheckImmunityForm setCertificate={setCertificate} setIsCertificateFetched={setIsCertificateFetched} resultRef={resultRef} />
        </div>
      </div>
      {isCertificateFetched && <CertificateResult certificate={certificate} resultRef={resultRef} /> }
    </Fragment>

  );
};

export default CheckImmunityView;
