
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

  const isMetaMaskReady = window.ethereum && window.ethereum.isMetaMask;

  const [activeAccount, setActiveAccount] = useState('');

  useEffect(() => { isMetaMaskReady && setActiveAccount(window.ethereum.selectedAddress); }, []);

  window.ethereum.on('accountsChanged', function (accounts) {
    setActiveAccount(accounts ? accounts[0] : '');
  });

  return (
    <Router>
      <div className="container">
        <Header title={projectTitle} />
        {isMetaMaskReady ? !activeAccount && <AccountNotReady /> : <MetaMaskNotReady />}
        {activeAccount && (
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
