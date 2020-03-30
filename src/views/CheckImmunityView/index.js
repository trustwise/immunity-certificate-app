
import React from "react";
import { Fragment, useState } from 'react';

import CheckImmunityForm from './form';
import Certificate from './certificate';


const CheckImmunityView = () => {
  const [certificate, setCertificate] = useState({});
  const [isCertificateFetched, setIsCertificateFetched] = useState(false);
  
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
)};


export default CheckImmunityView;
