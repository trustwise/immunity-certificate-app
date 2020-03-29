import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import FieldError from './error';


/**
 * File field with label and errors.
 *
 * TODO add other props as necessary (className, placeholder, etc.)
 */
const FileField = ({ id, label, name, type, ...props }) => (
  <Fragment>
    {label && (<label htmlFor={id || name}>{label}</label>)}
    <FieldError name={name} />
    <Field type={type} id={id || name} name={name} {...props} />
  </Fragment>
);

FileField.defaultProps = {
  id: '',
  label: '',
  type: 'file',
};

FileField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default FileField;
