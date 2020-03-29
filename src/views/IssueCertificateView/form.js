import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { DateField, TextField, TimeField } from '../../core/forms/fields';


const IssueCertificateForm = () => (
  <Formik
    initialValues={{
      idNumber: '',
      testKitID: '',
      date: '',
      time: '',
    }}
    validationSchema={Yup.object({
      idNumber: Yup.string().required('This field is required'),
      testKitID: Yup.string().required('This field is required'),
      date: Yup.string().required('This field is required'),
      time: Yup.string().required('This field is required'),
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
        <DateField
          label="Date and Time"
          name="date"
        />
        <TimeField
          name="time"
        />
        <button className="button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);


export default IssueCertificateForm;
