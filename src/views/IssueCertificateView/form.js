import React, { useState, Fragment } from 'react';
import { Formik, Form } from 'formik';
import QRCode from 'qrcode.react';
import * as Yup from 'yup';

import { DateField, TextField, TimeField } from '../../core/forms/fields';
import { generatePepper } from "../../core/utils";

const IssueCertificateForm = () => {

  const [qrValue, setQrValue] = useState('');

  const onCreateClick = (values) => {
    if (!values.idNumber) return false;
    const pepper = generatePepper(8);
    setQrValue(`${values.idNumber}::${pepper}`);
  }

  return (
    <Formik
      initialValues={{
        identityMethod: 'create',
        idNumber: '',
        testKitId: '',
        expiryDate: '',
        expiryTime: '09:00',
        sampleDate: '',
        sampleTime: '09:00',
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
        const personHash = web3.utils.sha3(qrValue);
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
      {({ isSubmitting, values, setFieldValue, handleBlur, handleChange }) => (
        <Form>
          <h2>Choose Identity</h2>
          <div className="text-align-left">
            <input
              type="radio"
              id="identityMethod_1"
              name="identityMethod"
              value="create"
              checked={values.identityMethod == 'create'}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="label-inline" htmlFor="identityMethod_1" >Create new identity</label>
            <br/>
            <input
              type="radio"
              id="identityMethod_2"
              name="identityMethod"
              value="scan"
              checked={values.identityMethod == 'scan'}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="label-inline" htmlFor="identityMethod_2">Scan existing ID</label>
          </div>

          { values.identityMethod === 'create' && (
            <Fragment>
              <TextField label="ID Number" name="idNumber" type="text" />
              <button className="button" type="button" onClick={(_e) => onCreateClick(values)} >
                Create
              </button>
            </Fragment>
          )}

          { qrValue && <QRCode className="qr-code-img" value={qrValue} level="H" /> }

          <hr />

          <h2>Issue Certificate</h2>

          <TextField
            label="Test Kit ID"
            name="testKitId"
            type="text"
          />

          <label htmlFor="sampleDate">Sample Date and Time</label>
          <div className="row">
            <div className="column column-67">
              <DateField name="sampleDate" />
            </div>
            <div className="column column-33">
              <TimeField name="sampleTime" />
            </div>

          </div>

          <label htmlFor="expiryDate">Expiry Date and Time</label>
          <div className="row">
            <div className="column column-67">
              <DateField name="expiryDate" />
            </div>
            <div className="column column-33">
              <TimeField name="expiryTime" />
            </div>

          </div>

          <button className="button" type="submit" disabled={isSubmitting}>
            Submit
          </button>

        </Form>
      )}
    </Formik>
  );
};


export default IssueCertificateForm;
