import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { DateField, TextField, TimeField } from '../../core/forms/fields';
import { generatePepper } from "../../core/utils";


const IssueCertificateForm = () => (
  <Formik
    initialValues={{
      idNumber: '',
      testKitId: '',
      expiryDate: '',
      expiryTime: '',
      sampleDate: '',
      sampleTime: '',
    }}
    validationSchema={Yup.object({
      idNumber: Yup.string().required('This field is required'),
      testKitId: Yup.string().required('This field is required'),
      expiryDate: Yup.string().required('This field is required'),
      expiryTime: Yup.string().required('This field is required'),
      sampleDate: Yup.string().required('This field is required'),
      sampleTime: Yup.string().required('This field is required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      const pepper = generatePepper(8);
      const personHash = web3.utils.sha3(`${values.idNumber}::${pepper}`);
      const sampleTimestamp = Date.parse(`${values.sampleDate}T${values.sampleTime}`);
      const expiryTimestamp = Date.parse(`${values.expiryDate}T${values.expiryTime}`);
      issueCertificate(
        personHash,
        sampleTimestamp,
        expiryTimestamp,
        values.testKitId,
      )
      setSubmitting(false);
    }}
  >
    {({ isSubmitting, values }) => (
      <Form>
        <TextField
          label="ID Number"
          name="idNumber"
          type="text"
        />
        <TextField
          label="Test Kit ID"
          name="testKitId"
          type="text"
        />

        <label htmlFor="sampleDate">Sample Date and Time</label>
        <DateField name="sampleDate" />
        <TimeField name="sampleTime" />

        <label htmlFor="expiryDate">Expiry Date and Time</label>
        <DateField name="expiryDate" />
        <TimeField name="expiryTime" />

        <button className="button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);


export default IssueCertificateForm;
