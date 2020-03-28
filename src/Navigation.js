import React from "react";
import { Link } from "react-router-dom";


const Navigation = () => (
  <nav className="row">
    <div className="column">
      <Link className="button button-outline" to="/tester-approval/">Tester Approval</Link>
    </div>
  </nav>
);

export default Navigation;
