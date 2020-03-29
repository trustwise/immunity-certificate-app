import React from "react";
import { Link } from "react-router-dom";


const Navigation = ({isAuthorityAccount, isTesterAccount}) => (
  <nav className="row row-centered">
    <div className="column column-25">
      <Link className="button button-outline" to="/check-immunity/">Check Immunity</Link>
    </div>
    {isAuthorityAccount && (
      <div className="column column-25">
        <Link className="button button-outline" to="/tester-approval/">Tester Approval</Link>
      </div>
    )}
    {isTesterAccount && (
      <div className="column column-25">
        <Link className="button button-outline" to="/issue-certificate/">Issue Certificate</Link>
      </div>
    )}
  </nav>
);

export default Navigation;
