import React from "react";

const CertificateResult = ({ passportId, testerId, testerName, validityDate }) => (
  <div className="row">
    <div className="column">
      <br />
      <h3>COVID19</h3>
      <br />
      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
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