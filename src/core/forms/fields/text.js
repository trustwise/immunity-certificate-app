import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field } from 'formik';


/**
 * Text field with label and errors.
 *
 * TODO add other props as necessary (className, placeholder, etc.)
 */
const TextField = ({ id, label, name, type, ...props }) => (
    <Fragment>
        {label && (<label htmlFor={id || name}>{label}</label>)}
        <ErrorMessage name={name} />
        <Field type={type} id={id || name} name={name} {...props} />
    </Fragment>
);

TextField.defaultProps = {
    id: '',
    label: '',
    type: 'text',
};

TextField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default TextField;
