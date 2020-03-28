import React from "react";
import { Link } from "react-router-dom";


const Header = ({ title }) => (
  <header className="row">
    <div className="column">
      <h1><Link to="/">{title}</Link></h1>
    </div>
  </header>
);

export default Header;
