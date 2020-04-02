import React from 'react';
import PropTypes from 'prop-types';

import TextField from './text';


/**
 * Time field with label and errors.
 *
 * TODO add other props as necessary (className, placeholder, etc.)
 */
const TimeField = ({ id, label, name, ...props }) => (
    <TextField type="time" id={id} label={label} name={name} {...props} />
);

TimeField.defaultProps = {
    id: '',
    label: '',
};

TimeField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default TimeField;
