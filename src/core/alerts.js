import React from "react";

export const MetaMaskNotReady = () => (
    <div className="message">
        <p>MetaMask not available.<br />Please install <a target="_blank" href="https://metamask.io/">MetaMask</a> extension first.</p>
        <a href="https://metamask.io/download.html" className="button">Install</a>
    </div>
);


export const AccountNotReady = () => {
    return (
        <div className="message">
            <p>You need to connect to MetaMask before you can continue.</p>
            <button className="button" onClick={(_e) => { window.ethEnabled(); }}>
                Connect
            </button>
        </div>
    )
};