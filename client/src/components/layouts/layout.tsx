import * as React from "react";
import "./layout.css";
import { Component } from "react";
// import { Header } from "./header";
import { Main } from "./main";
import { Footer } from "./footer";
import { BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Header from "./header";
import Paper from '@material-ui/core/Paper';


export class Layout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container maxWidth="xl" className="layout">
          <header>
            <Header />
          </header>

          <main>


            <Main />

          </main>
          <hr />
          <footer>
            <Footer />
          </footer>
        </Container>
      </BrowserRouter>
    );
  }
}
