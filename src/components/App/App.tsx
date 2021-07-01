import React from "react";
import Header from "./Header";
import { Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <AmplifyAuthenticator>
      <CssBaseline />
      <Header />
      <Container>
        <Switch>
          <Route exact path="/collections">
            <h1>Collections</h1>
          </Route>
        </Switch>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Container>
    </AmplifyAuthenticator>
  );
}

export default App;
