
import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Header, Navigation } from './core/components';
import { IndexView, IssueCertificateView, TesterApprovalView, CheckImmunityView } from './views';
import { Message, AccountNotConnected, MetaMaskNotAvailable } from './core/messages';
import { enableEthereum, isAuthority, isTester } from './blockchain';


const App = () => {

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
        <Header title="Immunity Certificates" />
        {isMetaMaskAvailable ? !activeAccount && <AccountNotConnected /> : <MetaMaskNotAvailable />}
        {activeAccount && (
          <Fragment>
            <Navigation isAuthorityAccount={isAuthorityAccount} isTesterAccount={isTesterAccount} />
            <Switch>
              <Route path="/tester-approval/">
                {isAuthorityAccount ? <TesterApprovalView /> : <Message>This view is accessible only by authorities.</Message>}
              </Route>
              <Route path="/issue-certificate/">
                {isTesterAccount ? <IssueCertificateView /> : <Message>This view is accessible only by testers.</Message>}
              </Route>
              <Route path="/check-immunity/">
                {isMetaMaskAvailable ? <CheckImmunityView /> : <Message>You need metamask for this view.</Message>}
              </Route>
              <Route path="/">
                <IndexView />
              </Route>
            </Switch>
          </Fragment>
        )}
      </div>
    </Router>
  );
}


export default App;
