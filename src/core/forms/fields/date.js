import React from 'react';
import PropTypes from 'prop-types';

import TextField from './text';

/**
 * Date field with label and errors.
 *
 * TODO add other props as necessary (className, placeholder, etc.)
 */
const DateField = ({ id, label, name, ...props }) => (
    <TextField type="date" id={id} label={label} name={name} {...props} />
);

DateField.defaultProps = {
    id: '',
    label: '',
};

DateField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default DateField;
