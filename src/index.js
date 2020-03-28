import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/milligram/dist/milligram.min.css";
import "./styles.scss";
import "babel-polyfill";
import "./blockchain";

var mountNode = document.getElementById("app");
ReactDOM.render(<App projectTitle="Immunity Certificate" />, mountNode);