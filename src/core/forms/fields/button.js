import React, { Fragment } from 'react';


const Button = ({ className, children, disabled, type, ...props }) => (
  <button
    type={type || 'button'}
    className={`button ${className}`}
    disabled={!!disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
