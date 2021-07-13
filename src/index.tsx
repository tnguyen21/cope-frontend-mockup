import React from "react"
import ReactDOM from "react-dom"
//import { Route, Router } from "react-router-dom"
//import { history } from "./routing/history"
import { ThemeProvider } from "@material-ui/styles"
import theme from "./theme"
//import App from "./components/App";
import App from "./App"
import awsconfig from "./aws-exports"
//import { registerRouterDOM } from "@-0/browser"
import * as K from "@-0/keys"
import { router } from "./router"
import { Provider } from "./components"
import { configureWith } from "cope-client-utils"
// additional configurations in cope-client-utils provided
// to properly assign ownership to created Nodes/Assets
configureWith(awsconfig)
//registerRouterDOM(router)
ReactDOM.render(
    <Provider
        CFG={{
            [K.CFG_RUTR]: router,
        }}
    >
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root"),
)
