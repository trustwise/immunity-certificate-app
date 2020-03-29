import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextField } from '../../core/forms/fields';
import Web3 from "web3";


const CheckImmunityForm = () => (
  <Formik
    initialValues={{
      id: '',
    }}
    validationSchema={Yup.object({
      id: Yup.string().required('This field is required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      const address = Web3.utils.sha3(`${values.id}`);
      console.log("address: ", address)
      getLastCertificate(address);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting, values }) => (
      <Form>
        <TextField
          label="Personal Code"
          name="id"
          type="text"
          placeholder=""
        />
        <button className="button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);


export default CheckImmunityForm;
