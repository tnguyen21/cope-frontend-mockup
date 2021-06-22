import React from 'react';
import Header from "./Header";
import { Container } from "@material-ui/core";
import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Container>
      <Header />
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route path="/about">
          <h1>About</h1>
        </Route>
        <Route path="/nested/route">
          <h1>Nested Route</h1>
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
  );
}

export default App;
