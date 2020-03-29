import React from "react";

export const Message = ({ children }) => <div className="message">{children}</div>;

export const MetaMaskNotAvailable = () => (
  <Message>
    <p>MetaMask not available.<br />Please install <a target="_blank" href="https://metamask.io/">MetaMask</a> extension first.</p>
    <a href="https://metamask.io/download.html" className="button">Install</a>
  </Message>
);


export const AccountNotConnected = () => (
  <Message>
    <p>You need to connect to MetaMask before you can continue.</p>
    <button className="button" onClick={(_e) => { window.ethEnabled(); }}>
        Connect
    </button>
  </Message>
);