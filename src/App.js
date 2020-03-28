
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './Header';
import Home from './Home';
import Navigation from './Navigation';
import TesterApproval from './TesterApproval';
import { AccountNotReady , MetaMaskNotReady } from './core/alerts'


const App = ({ projectTitle }) => {
  const isMetaMaskReady = window.ethereum && window.ethereum.isMetaMask;
  const isAccountReady = isMetaMaskReady && window.ethereum.selectedAddress;

  return (
    <Router>
      <div className="container">
        <Header title={projectTitle} />
        {isMetaMaskReady ? !isAccountReady && <AccountNotReady /> : <MetaMaskNotReady />}
        {isAccountReady && (
          <Fragment>
            <Navigation />
            <Switch>
              <Route path="/tester-approval/">
                <TesterApproval />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Fragment>
        )}
      </div>
    </Router>
  );
}


export default App;
