
import React, { Fragment, useEffect, useState } from 'react';
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

  const [isMetaMaskReady, setIsMetaMaskReady] = useState({});
  useEffect(() => { setIsMetaMaskReady(window.ethereum && window.ethereum.isMetaMask) }, []);

  const [isAccountReady, setIsAccountReady] = useState({});
  useEffect(() => { setIsAccountReady(isMetaMaskReady && window.ethereum.selectedAddress) }, []);

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
