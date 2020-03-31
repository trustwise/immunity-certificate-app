import React from "react";
import CheckMark from "../core/components/CheckMark"

const CertificateResult = ({ passportId, testerId, testerName, validityDate }) => (
  <div className="row">
    <div className="column">
      <br />
      <h3>COVID19</h3>
      <br />
      <CheckMark size="large"/>
      <br />
      <span className="light-grey">Passport ID</span>
      <h4>{passportId}</h4>
      <span className="light-grey">Doctor Name and ID</span>
      <h4>{`${testerName}, ${testerId}`}</h4>
      <span className="light-grey">{validityDate}</span>
      <h4>29.9.2020</h4>
    </div>
  </div>
);

export default CertificateResult;