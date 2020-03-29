import React from "react";
import { Link } from "react-router-dom";


const Navigation = ({isAuthorityAccount, isTesterAccount, isMetaMaskAvailable}) => (
  <nav className="row">
    {isAuthorityAccount && (
      <div className="column">
        <Link className="button button-outline" to="/tester-approval/">Tester Approval</Link>
      </div>
    )}
    {isTesterAccount && (
      <div className="column">
        <Link className="button button-outline" to="/issue-certificate/">Issue Certificate</Link>
      </div>
    )}
    {isMetaMaskAvailable && (
      <div className="column">
        <Link className="button button-outline" to="/check-immunity/">Check Immunity</Link>
      </div>
    )}
  </nav>
);

export default Navigation;
