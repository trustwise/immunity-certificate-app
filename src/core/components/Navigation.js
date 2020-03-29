import React from "react";
import { Link } from "react-router-dom";


const Navigation = ({isAuthorityAccount, isTesterAccount}) => (
  <nav className="row">
    <div className="column">
      {isAuthorityAccount && <Link className="button button-outline" to="/tester-approval/">Tester Approval</Link>}
    </div>
  </nav>
);

export default Navigation;
