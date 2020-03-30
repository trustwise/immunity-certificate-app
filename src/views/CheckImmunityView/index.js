
import React from "react";
import { useEffect } from 'react';


import CheckImmunityForm from './form'
import {enableInfura} from '../../blockchain';

const CheckImmunityView = () => {
  useEffect(() => {
    enableInfura();
  }, []);
  return (
  <div className="row">
    <div className="column">
      <h2>Check Immunity</h2>
      <CheckImmunityForm />
    </div>
  </div>
  );
};


export default CheckImmunityView;
