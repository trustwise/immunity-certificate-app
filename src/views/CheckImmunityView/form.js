import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Web3 from "web3";

import { LegacyQrReader } from '/core/components';
import { SEPARATOR } from "/core/constants";


const CheckImmunityForm = ({setCertificate, setIsCertificateFetched, resultRef}) => {
  const handleSubmitFinished = (result, setSubmitting) => {
    setCertificate(result);
    setIsCertificateFetched(true);
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{
        personalCode: '',
      }}
      validationSchema={Yup.object({
        personalCode: Yup.string().required('This field is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const personalCode = Web3.utils.sha3(`${values.personalCode}`);
        getLastCertificate(personalCode).then((result) => {
          try {
            getTesterId(result.tester).then((tester) => {
              const [testerName, testerId] = tester.split(SEPARATOR);
              const [passportId, _pepper] = values.personalCode.split(SEPARATOR);
              result.expired = result.expiryTimestamp < Math.floor(Date.now() / 1000);
              result.expiryDate = new Date(result.expiryTimestamp * 1000);
              result.sampleDate = new Date(result.sampleTimestamp * 1000);
              result.passportId = passportId;
              result.testerId = testerId;
              result.testerName = testerName;
              handleSubmitFinished(result, setSubmitting);
              resultRef.current && resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            });
          } catch (_error) {
            handleSubmitFinished(result, setSubmitting);
          }
        });
      }}
    >
      {({ setFieldValue, submitForm }) => {
        const onScan = (result) => {
          if (result) {
            // TODO handle invalid QR code
            setFieldValue('personalCode', result);
            submitForm();
          }
        }
        return (
          <Form>
            <LegacyQrReader onScan={onScan} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CheckImmunityForm;
