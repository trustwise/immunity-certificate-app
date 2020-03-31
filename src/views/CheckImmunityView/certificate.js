import React, { Fragment } from "react";

import { Message } from "../../core/messages";

const Certificate = ({certificate}) => {

  if (!certificate) {
    return(
      <div><Message>No certificate found</Message></div>
    );
  } else {
    console.log(certificate);
    var status;

    if (certificate.revoked) {
      status = "❌ Certificate revoked";
    } else if ( certificate.expiryTimestamp < Date.now() ) {
      status = "❌ Certificate expired";
    } else {
      status = "✔ Immune";
    }

    return (
      <div>
        <h2>Certificate</h2>
        <table>
          <tbody>
            <tr>
              <td><strong>ID</strong></td>
              <td><strong>{certificate.personalCode}</strong></td>
            </tr>
            <tr>
              <td><strong>Immunity status</strong></td>
              <td><strong>{status}</strong></td>
            </tr>
            <tr>
              <td><small>Tester ID</small></td>
              <td><small>{certificate.testerId}</small></td>
            </tr>
            <tr>
              <td><small>Tester name</small></td>
              <td><small>{certificate.testerName}</small></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Certificate;
