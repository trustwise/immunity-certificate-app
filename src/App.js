
import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './Header';
import Home from './Home';
import Navigation from './Navigation';
import TesterApprovalView from './TesterApproval';
import { Message, AccountNotConnected, MetaMaskNotAvailable } from './core/messages';
import { enableEthereum, isAuthority, isTester } from './blockchain';


const App = ({ projectTitle }) => {

  const isMetaMaskAvailable = 'ethereum' in window && 'isMetaMask' in ethereum && ethereum.isMetaMask;

  const [activeAccount, setActiveAccount] = useState('');
  useEffect(() => {
    if (isMetaMaskAvailable) {
      setActiveAccount(ethereum.selectedAddress)
      enableEthereum();
    }
  }, []);
  isMetaMaskAvailable && ethereum.on('accountsChanged', function (accounts) {
    setActiveAccount(accounts ? accounts[0] : '');
  });

  const [isAuthorityAccount, setIsAuthorityAccount] = useState(false);
  useEffect(() => {
    if (!activeAccount) { setIsAuthorityAccount(false); return; }
    isAuthority(activeAccount).then(result => setIsAuthorityAccount(result));
  }, [activeAccount]);

  const [isTesterAccount, setIsTesterAccount] = useState(false);
  useEffect(() => {
    if (!activeAccount) { setIsTesterAccount(false); return; }
    isTester(activeAccount).then(result => setIsTesterAccount(result));
  }, [activeAccount]);

  return (
    <Router>
      <div className="container">
        <Header title={projectTitle} />
        {isMetaMaskAvailable ? !activeAccount && <AccountNotConnected /> : <MetaMaskNotAvailable />}
        {activeAccount && (
          <Fragment>
            <Navigation isAuthorityAccount={isAuthorityAccount} isTesterAccount={isTesterAccount} />
            <Switch>
              <Route path="/tester-approval/">
                {isAuthorityAccount ? <TesterApprovalView /> : <Message>This view is accessible only by authorities.</Message>}
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
