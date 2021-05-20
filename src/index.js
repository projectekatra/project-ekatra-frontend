import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#11cb5f",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#fff',
    },
  },
});


ReactDOM.render(<ThemeProvider theme={theme}> <App /> </ThemeProvider>, document.getElementById("root"));
