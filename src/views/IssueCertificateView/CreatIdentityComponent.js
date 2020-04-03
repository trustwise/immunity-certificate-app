import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';

import { SEPARATOR } from "/core/constants";
import { DescriptionList } from '/core/components';
import { Button, TextField } from '/core/forms/fields';


const CreatIdentityComponent = ({ onSubmit, passportId, pepper }) => (
  <Fragment>
    <TextField label="Passport ID" name="passportId" type="text" />
    <Button onClick={onSubmit}>Create</Button>
    {passportId && pepper && (
      <Fragment>
        <hr />
        <QRCode className="qr-code-img" value={`${passportId}${SEPARATOR}${pepper}`} level="H" />
        <DescriptionList data={[['Passport ID', passportId], ['Personal Security Code', pepper]]} />
      </Fragment>
    )}
  </Fragment>
);

export default CreatIdentityComponent;
