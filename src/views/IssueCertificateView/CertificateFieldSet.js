// TODO real fieldset, check formik docs, check milligram

import React, { Fragment } from 'react';

import { Button, DateTimeFields, TextField } from '/core/forms/fields';


const CertificateFieldSet = () => (
  <Fragment>
    <hr />
    <h2>Issue Certificate</h2>
    <TextField
      label="Test Kit ID"
      name="testKitId"
      type="text"
    />
    <DateTimeFields
      label="Sample Date and Time"
      nameDate="sampleDate"
      nameTime="sampleTime"
    />
    <DateTimeFields
      label="Expiry Date and Time"
      nameDate="expiryDate"
      nameTime="expiryTime"
    />
    <Button type="submit">Submit</Button>
  </Fragment>
);

export default CertificateFieldSet;
