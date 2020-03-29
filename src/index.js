import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/app.scss";
import "babel-polyfill";
import "./blockchain";

module.hot && module.hot.accept()

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
