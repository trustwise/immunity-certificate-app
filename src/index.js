import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import App from "/App";
import "/styles/app.scss";

module.hot && module.hot.accept()

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
