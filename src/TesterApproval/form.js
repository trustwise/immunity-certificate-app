import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from '../core/forms/fields/text';


const TesterApprovalForm = () => (
  <Formik
    initialValues={{
      name: '',
      id: '',
      address: '',
    }}
    validationSchema={Yup.object({
      name: Yup.string().required('This field is required'),
      id: Yup.string().required('This field is required'),
      address: Yup.string().required('This field is required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      const testerId = `${values.id}::${values.name}`;
      approveTester(values.address, testerId);
      setSubmitting(false);
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
