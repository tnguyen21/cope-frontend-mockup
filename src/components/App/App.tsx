import React from "react"
import { Header } from "../Header"
import Collections from "../Collections"
import Editor from "../Editor"
import { CssBaseline } from "@material-ui/core"
import { Route, Redirect, Switch } from "react-router-dom"
import { AmplifyAuthenticator } from "@aws-amplify/ui-react"

function App() {
    return (
        <AmplifyAuthenticator>
            <CssBaseline />
            <Header />
            <Switch>
                <Redirect exact from="/" to="/collections" />
                <Route exact path="/collections">
                    <Collections />
                </Route>
                <Route exact path="/collections/:collection">
                    <Collections />
                </Route>
                <Route path="/collections/:collection/new">
                    <Editor newNode={true} />
                </Route>
                <Route path="/collections/edit/:nodeId">
                    <Editor />
                </Route>
            </Switch>
        </AmplifyAuthenticator>
    )
}

export default App
