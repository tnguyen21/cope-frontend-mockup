import React from "react"
import ReactDOM from "react-dom"
//import { Route, Router } from "react-router-dom"
//import { history } from "./routing/history"
import { ThemeProvider } from "@material-ui/styles"
//import App from "./components/App";
import App from "./App"
import awsconfig from "./aws-exports"
//import { registerRouterDOM } from "@-0/browser"
import * as K from "@-0/keys"
import { router } from "./router"
import { Provider } from "./components"
import { configureWith } from "cope-client-utils"
import ThemeConfig from "./theme"

// additional configurations in cope-client-utils provided
// to properly assign ownership to created Nodes/Assets
configureWith(awsconfig)

ReactDOM.render(
    <Provider
        CFG={{
            [K.CFG_RUTR]: router,
        }}
    >
        <ThemeConfig>
            <App />
        </ThemeConfig>
    </Provider>,
    document.getElementById("root")
)
