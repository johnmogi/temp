import * as React from "react"; import "./layout.css"; import { Component } from "react"; import { Header } from "./header"; import { Main } from "./main"; import { Footer } from "./footer"; import { BrowserRouter } from "react-router-dom"; import Container from "@material-ui/core/Container";

import { ThemeProvider } from "@material-ui/styles"; import { CssBaseline, Typography, createMuiTheme } from "@material-ui/core"; import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({ palette: { type: "light", primary: red } });

export class Layout extends Component { render() { return ( 

<browserrouter>
  <themeprovider theme="{theme}">
  <cssbaseline>
  <typography 10="" style="{{" margintop:="" }}="">
  <container maxwidth="xl" classname="layout">
</container>
</typography>
</cssbaseline>
</themeprovider>
</browserrouter>

<header>
  <header>
</header>
  <hr>
  <main>
  <main>
</main>
  <hr>
  <footer><footer>
</footer>
            
          
        
      
    );
  }
}<p>
</p></footer>
</main>
</header>
