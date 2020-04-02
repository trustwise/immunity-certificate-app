import React, { Fragment } from 'react';

import DateField from './date';
import TimeField from './time';


const DateTimeFields = ({ label, nameDate, nameTime }) => (
  <Fragment>
    <label htmlFor={nameDate}>{label}</label>
    <div className="row">
      <div className="column column-67">
        <DateField name={nameDate} />
      </div>
      <div className="column column-33">
        <TimeField name={nameTime} />
      </div>
    </div>
  </Fragment>
);

export default DateTimeFields;
