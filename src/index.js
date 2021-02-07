import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReactGA from 'react-ga';

ReactGA.initialize('UA-178399244-1');
ReactDOM.render(<App />, document.getElementById("root"));
