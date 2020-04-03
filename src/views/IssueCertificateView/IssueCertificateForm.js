import React, { useEffect, useState, Fragment } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CheckMark } from '/core/components';
import { Message } from '/core/messages';
import { SEPARATOR } from '/core/constants';
import { Button, RadioField } from '/core/forms/fields';
import { generatePepper } from '/core/utils';

import CertificateFieldSet from './CertificateFieldSet';
import CreatIdentityComponent from './CreatIdentityComponent';
import ScanIdentityComponent from './ScanIdentityComponent';

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
      {(form) => {

        useEffect(() => {
          setPepper('');
          setPassportId('');
          resetCertificateForm();
        }, [form.values.identityMethod]);

        const resetCertificateForm = () => {
          setCertificateIssued(false);
          ['testKitId', 'expiryDate', 'expiryTime', 'sampleDate', 'sampleTime'].map((fieldName) => {
            form.setFieldValue(fieldName, form.initialValues[fieldName]);
          });
        }

        const handleCreateIdentity = (_e) => {
          form.validateField('passportId');
          setPassportId(form.values.passportId);
          setPepper(generatePepper(8));
          resetCertificateForm();
        }

        const handleFormReset = (_e) => {
          form.resetForm();
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

            <div className="radio-button-group">
              {[['create', 'Create new identity'], ['scan', 'Scan existing ID']].map(
                ([value, label]) => (
                  <RadioField
                    key={value}
                    value={value}
                    label={label}
                    name="identityMethod"
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    checked={form.values.identityMethod == value}
                  />
                )
              )}
            </div>

            {form.values.identityMethod === 'create' && (
              <CreatIdentityComponent
                onSubmit={handleCreateIdentity}
                passportId={passportId}
                pepper={pepper}
              />
            )}

            {form.values.identityMethod === 'scan' && (
              <ScanIdentityComponent
                onScan={handleQrScan}
                passportId={passportId}
                pepper={pepper}
              />
            )}

            {certificateIssued && (
              <Fragment>
                <CheckMark size="large" />
                <h4 className="padded">Certificate issued</h4>
                <Button className="button-outline" onClick={handleFormReset}>Issue Another</Button>
              </Fragment>
            )}

            {(!certificateIssued && form.isSubmitting ) && (
              <Message>
                Please confirm the certificate issuing and wait for the confirmation.
                This may take a couple of seconds depending on the network speed.
              </Message>
            )}

            {(!certificateIssued && !form.isSubmitting) && <CertificateFieldSet  />}

          </Form>
        );
      }}
    </Formik>
  );
};

export default IssueCertificateForm;
