import React, { useState, Fragment } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Web3 from "web3";

import QrReader from '../../core/components/qrReader';
import { TextField } from '../../core/forms/fields';

require('webrtc-adapter');

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
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <QrReader setFieldValue={setFieldValue} />
          
          <TextField
            label="Personal Code"
            name="personalCode"
            type="text"
            placeholder=""
          />
          <button className="button" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
};

export default CheckImmunityForm;
