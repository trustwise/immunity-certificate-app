import React from "react";
import { enableEthereum } from '/blockchain';

import { Button } from '/core/forms/fields';


export const Message = ({ children, className }) => <div className={`message ${className}`}>{children}</div>;


export const CertificateExpired = () => <Message className="uppercase">This certificate has expired!</Message>


export const CertificateRevoked = () => <Message className="uppercase">This certificate has been revoked!</Message>


export const MetaMaskNotAvailable = () => (
  <Message>
    <p>MetaMask not available.<br />Please install <a target="_blank" href="https://metamask.io/">MetaMask</a> extension first.</p>
    <a href="https://metamask.io/download.html" className="button">Install</a>
  </Message>
);


export const AccountNotConnected = () => (
  <Message>
    <p>You need to connect to MetaMask before you can continue.</p>
    <Button onClick={(_e) => { enableEthereum(); }}>Connect</Button>
  </Message>
);
