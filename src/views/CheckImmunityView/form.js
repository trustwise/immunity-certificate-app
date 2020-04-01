import React, { useState, Fragment } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Web3 from "web3";

import QrReader from '../../core/components/qrReader';


const CheckImmunityForm = ({setCertificate, setIsCertificateFetched}) => {

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
          getTesterId(result.tester).then(tester => {
            let tmp = tester.split(":");
            result.personalCode = values.personalCode.split(":")[0];
            result.testerId = tmp[0];
            result.testerName = tmp[2];
            setCertificate(result);
            setIsCertificateFetched(true);
          });
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, setFieldValue, submitForm }) => (
        <Form>
          <QrReader setFieldValue={setFieldValue} submitForm={submitForm} />
        </Form>
      )}
    </Formik>
  )
};

export default CheckImmunityForm;
