import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextField } from '../../core/forms/fields';


const IssueCertificateForm = () => (
  <Formik
    initialValues={{
      idNumber: '',
      testKitID: '',
      timestamp: '',
    }}
    validationSchema={Yup.object({
      idNumber: Yup.string().required('This field is required'),
      testKitID: Yup.string().required('This field is required'),
      timestamp: Yup.string().required('This field is required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values)
      setSubmitting(false);
    }}
  >
    {({ isSubmitting, values }) => (
      <Form>
        <TextField
          label="ID Number"
          name="idNumber"
          type="text"
          placeholder="12345678"
        />
        <TextField
          label="Test Kit ID"
          name="testKitID"
          type="text"
        />
        <TextField
          label="Date and Time"
          name="timestamp"
          type="text"
        />
        <button className="button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);


export default IssueCertificateForm;
