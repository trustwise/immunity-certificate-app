import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Web3 from "web3";

import { TextField, FileField } from '../../core/forms/fields';


const CheckImmunityForm = ({setCertificate, setIsCertificateFetched}) => {

  return (
    <Formik
      initialValues={{
        personalCode: '',
        qr: undefined,
      }}
      validationSchema={Yup.object({
        personalCode: Yup.string().required('This field is required'),
        // qr: Yup.mixed().test("fileformat", "Unsupported format", value => value && [ "image/jpg", "image/jpeg", "image/gif", "image/png" ].includes(value.type)),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const personalCode = Web3.utils.sha3(`${values.personalCode}`);

        getLastCertificate(personalCode).then((result) => {
          console.log(result);
          setCertificate(result);
          setIsCertificateFetched(true);
        });
        setSubmitting(false);
        console.log("submitting");
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <FileField
            label="Personal QR Code"
            name="qr"
          />
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
