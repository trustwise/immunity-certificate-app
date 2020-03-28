
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home'
import TesterApproval from './TesterApproval'


const App = ({ projectTitle }) => {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="column">
            <h1><Link to="/">{projectTitle}</Link></h1>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <Link className="button" to="/tester-approval/">Tester Approval</Link>
          </div>
        </div>
        <Switch>
          <Route path="/tester-approval/">
            <TesterApproval />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
