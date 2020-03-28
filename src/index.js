import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/milligram/dist/milligram.min.css";
import "./styles.scss";
import "babel-polyfill";

const Web3 = require("web3");

const ethEnabled = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.enable();
    }
    catch {
        return false;
    }
    return true;
  }
  return false;
}

window.ethEnabled = ethEnabled;

var mountNode = document.getElementById("app");
ReactDOM.render(<App projectTitle="Immunity Certificate" />, mountNode);