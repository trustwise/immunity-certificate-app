
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
import { Message, AccountNotConnected, MetaMaskNotAvailable } from './core/messages'


const App = ({ projectTitle }) => {

  const isMetaMaskAvailable = 'ethereum' in window && 'isMetaMask' in ethereum && ethereum.isMetaMask;

  const [activeAccount, setActiveAccount] = useState('');
  useEffect(() => {
    if (isMetaMaskAvailable) {
      setActiveAccount(ethereum.selectedAddress)
      ethEnabled();
    }
  }, []);
  isMetaMaskAvailable && ethereum.on('accountsChanged', function (accounts) {
    setActiveAccount(accounts ? accounts[0] : '');
  });

  const [isAuthorityAccount, setIsAuthorityAccount] = useState(false);
  useEffect(() => {
    if (!activeAccount) { setIsAuthorityAccount(false); return; }
    try {
      isAuthority(activeAccount).then(result => setIsAuthorityAccount(result));
    } catch {
      setIsAuthorityAccount(false);
    }
  }, [activeAccount]);

  const [isTesterAccount, setIsTesterAccount] = useState(false);
  useEffect(() => {
    if (!activeAccount) { setIsTesterAccount(false); return; }
    try {
      isTester(activeAccount).then(result => setIsTesterAccount(result));
    } catch {
      setIsTesterAccount(false);
    }
  }, [activeAccount]);

  return (
    <Router>
      <div className="container">
        <Header title={projectTitle} />
        {isMetaMaskAvailable ? !activeAccount && <AccountNotConnected /> : <MetaMaskNotAvailable />}
        {activeAccount && (
          <Fragment>
            <Navigation />
            <Switch>
              <Route path="/tester-approval/">
                {isAuthorityAccount ? <TesterApproval /> : <Message>This view is accessible only by authorities.</Message>}
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
