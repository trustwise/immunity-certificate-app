import React, { Fragment } from 'react';


const RadioField = ({ checked, id, label, name, type, value, ...props }) => {
  const fieldId = id || `${name}_${value}`;
  return (
    <Fragment>
      <input
        type="radio"
        id={fieldId}
        name={name}
        value={value}
        checked={checked}
        {...props}
      />
      <label className="label-inline" htmlFor={fieldId}>{label}</label>
      <br />
    </Fragment>
  );
};

export default RadioField;
