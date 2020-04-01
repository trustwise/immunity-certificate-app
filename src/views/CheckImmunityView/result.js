import React from "react";

import { CheckMark } from "../../core/components"
import { CertificateExpired, CertificateRevoked } from "../../core/messages";


const CertificateResult = ({ certificate, resultRef }) => {
  const { expired, expiryDate, revoked, passportId, testerId, testerName } = certificate;
  if (!certificate) {
    return <Message>No certificate found.</Message>;
  }
  return (
    <div className="row" ref={resultRef}>
      <div className="column">
        <br />
        <h3>COVID19 Immunity</h3>
        {revoked ? <CertificateRevoked /> : expired && <CertificateExpired />}
        {!revoked && !expired && <CheckMark size="large" />}
        <br />
        <span className="light-grey">Passport ID</span>
        <h4>{passportId}</h4>
        <span className="light-grey">Doctor Name and ID</span>
        <h4>{`${testerName}, ${testerId}`}</h4>
        <span className="light-grey">Valid Until</span>
        <h4>{`${expiryDate.getDate()}.${expiryDate.getMonth() + 1}.${expiryDate.getFullYear()} `}</h4>
      </div>
    </div>
  )
};

export default CertificateResult;
