import React, { Fragment, useState } from "react";
import Web3 from "web3";

import { LegacyQrReader } from '/core/components';
import { SEPARATOR } from "/core/constants";


const CheckImmunityForm = ({setCertificate, setIsCertificateFetched, resultRef}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleQrScan = (personalCode) => {
    setIsLoading(true);
    setIsCertificateFetched(false);
    // TODO handle invalid QR code
    if (!personalCode) {
      return null;
    }
    const personalCodeHash = Web3.utils.sha3(`${personalCode}`);
    getLastCertificate(personalCodeHash).then((result) => {
      try {
        getTesterId(result.tester).then((tester) => {
          const [testerId, testerName] = tester.split(SEPARATOR);
          const [passportId, _pepper] = personalCode.split(SEPARATOR);
          result.expired = result.expiryTimestamp < Math.floor(Date.now() / 1000);
          result.expiryDate = new Date(result.expiryTimestamp * 1000);
          result.sampleDate = new Date(result.sampleTimestamp * 1000);
          result.passportId = passportId;
          result.testerId = testerId;
          result.testerName = testerName;
          handleSubmitFinished(result);
          resultRef.current && resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        });
      } catch (_error) {
        handleSubmitFinished(result);
      }
    });
  };
  const handleSubmitFinished = (result) => {
    setCertificate(result);
    setIsCertificateFetched(true);
    setIsLoading(false);
  };
  return (
    <Fragment>
      <LegacyQrReader onScan={handleQrScan} disabled={isLoading} />
    </Fragment>
  );
};

export default CheckImmunityForm;
