import React from "react";
import Header from "./Header";
import Collections from "../Collections";
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
          <Route path="/collections/:collection">
            <Collections />
          </Route>
        </Switch>
      </Container>
      <CssBaseline />
    </AmplifyAuthenticator>
  );
}

export default App;
