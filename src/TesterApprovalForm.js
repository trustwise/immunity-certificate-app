import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from './core/forms/fields/text';

const TesterApprovalFormValidation = Yup.object({
  name: Yup.string().required('This field is required'),
  id: Yup.string().required('This field is required'),
  address: Yup.string().required('This field is required'),
});

const TesterApprovalForm = () => (
  <Formik
    initialValues={{
      name: '',
      id: '',
      address: '',
    }}
    validationSchema={TesterApprovalFormValidation}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        console.log(values)
        setSubmitting(false);
      }, 1000);
    }}
  >
    {({ isSubmitting, values }) => (
      <Form>
        <TextField
          label="Name"
          name="name"
          type="text"
        />
        <TextField
          label="ID"
          name="id"
          type="text"
          placeholder="12345678"
        />
        <TextField
          label="Wallet Address"
          name="address"
          type="text"
          placeholder="0x"
        />
        <button className="button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);


export default TesterApprovalForm;
