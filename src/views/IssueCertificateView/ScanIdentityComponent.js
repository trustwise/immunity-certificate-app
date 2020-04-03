import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';

import { SEPARATOR } from "/core/constants";
import { DescriptionList, LegacyQrReader } from '/core/components';


const ScanIdentityComponent = ({ onScan, passportId, pepper }) => (
  <Fragment>
    <br />
    <LegacyQrReader onScan={onScan} />
    {passportId && pepper && (
      <Fragment>
        <hr />
        <DescriptionList data={[['Passport ID', passportId]]} />
      </Fragment>
    )}
  </Fragment>
);

export default ScanIdentityComponent;
