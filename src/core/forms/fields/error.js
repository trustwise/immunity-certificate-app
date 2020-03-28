import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';


/**
 * Field error with pre-defined class name.
 *
 */
const FieldError = ({ name }) => (
  <ErrorMessage name={name} render={(msg) => <div className="field-error">{msg}</div>} />
);


FieldError.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FieldError;
