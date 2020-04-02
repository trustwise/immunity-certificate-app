import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Web3 from "web3";

import LegacyQrReader from '/core/components/LegacyQrReader';


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
          let tmp = tester.split(":");
          result.expired = result.expiryTimestamp < Math.floor(Date.now() / 1000);
          result.expiryDate = new Date(result.expiryTimestamp * 1000);
          result.sampleDate = new Date(result.sampleTimestamp * 1000);
          result.passportId = values.personalCode.split(":")[0];
          result.testerId = tmp[0];
          result.testerName = tmp[2];
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
