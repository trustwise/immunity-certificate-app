import React, { Fragment } from "react";

import { isEmptyObject } from "../../core/utils";
import { Message } from "../../core/messages";


//TODO: add ID to the certificate object
//TODO: add tester to the certificate object

const Certificate = ({certificate}) => {
  if (isEmptyObject(certificate)) {
    return(
      <div><Message>No certificate found</Message></div>
    );
  } else {
    console.log(certificate);
    certificate.id;
    var status;
    var testerId;
    var testerName;

    if (certificate.revoked) {
      status = "❌ Certificate revoked";
    } else if ( certificate.expiryTimestamp > (Math.floor(Date.now() / 1000)) ) {
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
              <td><strong>{certificate.id}</strong></td>
            </tr>
            <tr>
              <td><strong>Immunity status</strong></td>
              <td><strong>{status}</strong></td>
            </tr>
            {/* <tr>
              <td><small>Tester ID</small></td>
              <td><small>{testerId}</small></td>
            </tr>
            <tr>
              <td><small>Tester name</small></td>
              <td><small>{testerName}</small></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Certificate;
