import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Web3 from "web3";

import LegacyQrReader from '/core/components/LegacyQrReader';
import { SEPARATOR } from "/core/constants";


const CheckImmunityForm = ({setCertificate, setIsCertificateFetched, resultRef}) => (
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
        getTesterId(result.tester).then((tester) => {
          const [testerName, testerId] = tester.split(SEPARATOR);
          const [passportId, _pepper] = values.personalCode.split(SEPARATOR);
          result.expired = result.expiryTimestamp < Math.floor(Date.now() / 1000);
          result.expiryDate = new Date(result.expiryTimestamp * 1000);
          result.sampleDate = new Date(result.sampleTimestamp * 1000);
          result.passportId = passportId;
          result.testerId = testerId;
          result.testerName = testerName;
          setCertificate(result);
          setIsCertificateFetched(true);
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        });
      });
      setSubmitting(false);
    }}
  >
    {({ setFieldValue, submitForm }) => {
      const onScan = (result) => {
        if (result) {
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

export default CheckImmunityForm;
