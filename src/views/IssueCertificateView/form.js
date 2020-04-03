import React, { useEffect, useState, Fragment } from 'react';
import { Formik, Form } from 'formik';
import QRCode from 'qrcode.react';
import * as Yup from 'yup';

import { CheckMark, DescriptionList, LegacyQrReader } from '/core/components';
import { Message } from '/core/messages';
import { SEPARATOR } from "/core/constants";
import { Button, DateTimeFields, RadioField, TextField } from '/core/forms/fields';
import { generatePepper } from "/core/utils";

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);
const inSixMonthsStr = new Date(today.setMonth(today.getMonth() + 6)).toISOString().slice(0, 10);


const IssueCertificateForm = () => {

  const [pepper, setPepper] = useState('');
  const [passportId, setPassportId] = useState('');
  const [certificateIssued, setCertificateIssued] = useState(false);

  return (
    <Formik
      initialValues={{
        identityMethod: 'create',
        expiryDate: inSixMonthsStr,
        expiryTime: '09:00',
        passportId: '',
        sampleDate: todayStr,
        sampleTime: '09:00',
        testKitId: '',
      }}
      validationSchema={Yup.object({
        expiryDate: Yup.string().required('This field is required'),
        expiryTime: Yup.string().required('This field is required'),
        passportId: Yup.string(),
        sampleDate: Yup.string().required('This field is required'),
        sampleTime: Yup.string().required('This field is required'),
        testKitId: Yup.string().required('This field is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const personHash = web3.utils.sha3(`${passportId}${SEPARATOR}${pepper}`);
        const sampleTimestamp = Math.floor(Date.parse(`${values.sampleDate}T${values.sampleTime}`) / 1000);
        const expiryTimestamp = Math.floor(Date.parse(`${values.expiryDate}T${values.expiryTime}`) / 1000);
        issueCertificate(personHash, sampleTimestamp, expiryTimestamp, values.testKitId)
          .then((result) => { result.status ? setCertificateIssued(true) : console.error(result); })
          .catch(console.error)
          .finally(() => { setSubmitting(false); });
      }}
    >
      {({ isSubmitting, values, handleBlur, handleChange, initialValues, resetForm, setFieldValue, validateField }) => {

        useEffect(() => {
          setPepper('');
          setPassportId('');
          resetCertificateForm();
        }, [values.identityMethod]);

        const resetCertificateForm = () => {
          setCertificateIssued(false);
          ['testKitId', 'expiryDate', 'expiryTime', 'sampleDate', 'sampleTime'].map((fieldName) => {
            setFieldValue(fieldName, initialValues[fieldName]);
          });
        }

        const handleCreateIdentity = (_e) => {
          validateField('passportId');
          setPassportId(values.passportId);
          setPepper(generatePepper(8));
          resetCertificateForm();
        }

        const handleFormReset = (_e) => {
          resetForm();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const handleQrScan = (result) => {
          if (!result || !result.includes(SEPARATOR)) {
            console.error('Invalid QR code.');
            return;
          }
          const [qrPassportId, qrPepper] = result.split(SEPARATOR);
          setPassportId(qrPassportId);
          setPepper(qrPepper);
          resetCertificateForm();
        }

        return (
          <Form>

            <h2>Choose Identity</h2>

            <div className="text-align-left">
              <RadioField
                label="Create new identity"
                name="identityMethod"
                value="create"
                checked={values.identityMethod == 'create'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br/>
              <RadioField
                label="Scan existing ID"
                name="identityMethod"
                value="scan"
                checked={values.identityMethod == 'scan'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            { values.identityMethod === 'create' && (
              <Fragment>
                <TextField label="Passport ID" name="passportId" type="text" />
                <Button onClick={handleCreateIdentity}>Create</Button>
                {passportId && pepper && (
                  <Fragment>
                    <hr />
                    <QRCode className="qr-code-img" value={`${passportId}${SEPARATOR}${pepper}`} level="H" />
                    <DescriptionList data={[['Passport ID', passportId], ['Personal Security Code', pepper]]} />
                  </Fragment>
                )}
              </Fragment>
            )}

            {values.identityMethod === 'scan' && (
              <Fragment>
                <br />
                <LegacyQrReader onScan={handleQrScan} />
                {passportId && pepper && (
                  <Fragment>
                    <hr />
                    <DescriptionList data={[['Passport ID', passportId]]} />
                  </Fragment>
                )}
              </Fragment>
            )}

            {certificateIssued && (
              <Fragment>
                <CheckMark size="large" />
                <br />
                <h4>Certificate issued</h4>
                <br />
                <Button className="button-outline" onClick={handleFormReset}>Issue Another</Button>
              </Fragment>
            )}

            {(!certificateIssued && isSubmitting ) && (
              <Message>
                Please confirm the certificate issuing and wait for the confirmation.
                This may take a couple of seconds depending on the network speed.
              </Message>
            )}

            {(!certificateIssued && !isSubmitting) && (
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
                <Button type="submit" disabled={isSubmitting}>Submit</Button>
              </Fragment>
            )}

          </Form>
        );
      }}
    </Formik>
  );
};


export default IssueCertificateForm;
